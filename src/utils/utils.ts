import sanitizeHtml from "sanitize-html";

export const cleanHtml = (html: string) =>
  sanitizeHtml(html, { allowedTags: [] });

export function formatDocUrl(url: string): string {
  let newUrl = url.replace("/edit", "/preview");

  if (url.startsWith("https://docs.google.com")) {
    if (!url.endsWith("/edit") && !url.endsWith("/preview")) {
      newUrl = url += "/preview";
    }
  }

  return newUrl;
}
