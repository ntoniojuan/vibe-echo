import { readEchoObservationLooksLikeHtml } from "@/lib/echo/readEchoObservationLooksLikeHtml";

const decodeBasicHtmlEntities = (input: string): string =>
  input
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");

export const readPlainTextFromEchoObservationHtml = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (!readEchoObservationLooksLikeHtml(trimmed)) {
    return trimmed;
  }
  const withBreaksAsSpace = trimmed
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<\/div>/gi, " ")
    .replace(/<\/li>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  const decoded = decodeBasicHtmlEntities(withBreaksAsSpace);
  return decoded.replace(/\s+/g, " ").trim();
};
