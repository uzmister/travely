import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, isLocale, matchLocale, type Locale } from "./config";

/** Locale from the user's cookie, falling back to the browser's Accept-Language. */
export async function resolveLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;
  return matchLocale((await headers()).get("accept-language"));
}
