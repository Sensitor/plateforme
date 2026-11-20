"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isAuthRetryableFetchError, type SupabaseClient, type User } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { supabaseConfigured } from "@/lib/supabase/config";

export interface Profile {
  id: string;
  display_name: string | null;
  tier: "free" | "pro" | "research_club";
  locale: "en" | "fr";
  email_alerts: boolean;
}

interface AuthState {
  configured: boolean;
  loading: boolean;
  user: User | null;
  profile: Profile | null;
  /** Set when the profile could not be read (typically: the SQL schema is not installed yet). */
  profileError: string | null;
  supabase: SupabaseClient | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  configured: false,
  loading: false,
  user: null,
  profile: null,
  profileError: null,
  supabase: null,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [loading, setLoading] = useState(supabaseConfigured);

  const loadProfile = useCallback(
    async (u: User | null) => {
      if (!supabase || !u) {
        setProfile(null);
        setProfileError(null);
        return;
      }
      const { data, error } = await supabase.from("profiles").select("id, display_name, tier, locale, email_alerts").eq("id", u.id).maybeSingle();
      setProfile((data as Profile | null) ?? null);
      setProfileError(error ? error.message : null);
    },
    [supabase],
  );

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    let currentId: string | null | undefined;

    // Re-render and reload the profile only when the account actually changes:
    // Supabase also emits events on every token refresh and when a tab regains focus.
    const apply = (next: User | null, force = false) => {
      if (cancelled) return;
      const id = next?.id ?? null;
      setLoading(false);
      if (!force && id === currentId) return;
      currentId = id;
      setUser(next);
      void loadProfile(next);
    };

    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        // A network failure says nothing about the session: keep what the auth events report.
        if (error && isAuthRetryableFetchError(error)) return setLoading(false);
        apply(data.user);
      })
      .catch(() => setLoading(false));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      // Deferred, as Supabase recommends: calling the client from inside this
      // callback while the auth state is being committed can stall it.
      setTimeout(() => apply(session?.user ?? null, event === "USER_UPDATED"), 0);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [supabase, loadProfile]);

  const value = useMemo<AuthState>(
    () => ({
      configured: supabaseConfigured,
      loading,
      user,
      profile,
      profileError,
      supabase,
      refreshProfile: () => loadProfile(user),
      signOut: async () => {
        await supabase?.auth.signOut();
        setUser(null);
        setProfile(null);
      },
    }),
    [loading, user, profile, profileError, supabase, loadProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
