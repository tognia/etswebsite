import { createContext, useContext, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type Locale = "fr" | "en";

const LanguageContext = createContext<Locale>("fr");

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const locale: Locale = location.pathname === "/en" || location.pathname.startsWith("/en/")
    ? "en"
    : "fr";

  return (
    <LanguageContext.Provider value={locale}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function isEnglishPath(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/");
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/en") return "/";
  return pathname.replace(/^\/en(?=\/)/, "") || "/";
}

export function withLocale(path: string, locale: Locale) {
  if (locale === "fr") return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path}`;
  return `/en${path}`;
}

export function alternateLocalePath(pathname: string, hash = "") {
  if (isEnglishPath(pathname)) {
    return `${stripLocalePrefix(pathname)}${hash}`;
  }

  const localizedPath = pathname === "/" ? "/en" : `/en${pathname}`;
  return `${localizedPath}${hash}`;
}
