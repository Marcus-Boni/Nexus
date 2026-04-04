import { getRequestConfig } from "next-intl/server";

import { getMessagesForLocale, isValidLocale } from "@/i18n/messages";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale =
    requestedLocale && isValidLocale(requestedLocale)
      ? requestedLocale
      : routing.defaultLocale;

  return {
    locale,
    messages: getMessagesForLocale(locale),
  };
});
