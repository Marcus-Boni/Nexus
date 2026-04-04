import { hasLocale } from "next-intl";
import enMessages from "@/i18n/messages/en";
import ptBRMessages from "@/i18n/messages/pt-BR";
import { routing } from "@/i18n/routing";

export const messages = {
  en: enMessages,
  "pt-BR": ptBRMessages,
} as const;

export type AppLocale = (typeof routing.locales)[number];
export type AppMessages = typeof enMessages;

export function isValidLocale(locale: string): locale is AppLocale {
  return hasLocale(routing.locales, locale);
}

export function getMessagesForLocale(locale: AppLocale) {
  return messages[locale];
}
