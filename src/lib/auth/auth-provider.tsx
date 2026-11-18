"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
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
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      setUser(data.user);
      setLoading(false);
      void loadProfile(data.user);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      void loadProfile(session?.user ?? null);
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
