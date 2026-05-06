import { readEchoObservationLooksLikeHtml } from "@/lib/echo/readEchoObservationLooksLikeHtml";

const decodeBasicHtmlEntities = (input: string): string =>
  input
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");

/**
 * Textarea and read-only views: plain notes as-is; legacy rich-text/HTML drafts become plain text
 * with line breaks preserved where possible.
 */
export const readEchoObservationForPlainDisplay = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (!readEchoObservationLooksLikeHtml(trimmed)) {
    return value;
  }
  let next = trimmed
    .replace(/\r\n/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<\/blockquote>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  next = decodeBasicHtmlEntities(next);
  return next.replace(/\n{3,}/g, "\n\n").trimEnd();
};
