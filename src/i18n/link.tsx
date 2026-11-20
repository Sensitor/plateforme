"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "./client";
import { localizeHref } from "./paths";

/** next/link that keeps the visitor in their interface language. */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  const localized = typeof href === "string" ? localizeHref(locale, href) : href.pathname ? { ...href, pathname: localizeHref(locale, href.pathname) } : href;
  return <NextLink href={localized} {...props} />;
}
