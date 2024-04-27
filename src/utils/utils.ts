import * as sanitizeHtml from "sanitize-html";

export const cleanHtml = (html: string) =>
  sanitizeHtml(html, { allowedTags: [] });
