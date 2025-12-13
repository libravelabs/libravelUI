export function loadThemeFonts(urls?: string[]) {
  document
    .querySelectorAll('link[data-theme-font="true"]')
    .forEach((el) => el.remove());

  if (!urls || urls.length === 0) return;

  for (const url of urls) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.setAttribute("data-theme-font", "true");
    document.head.appendChild(link);
  }
}
