import { themes } from "@/app/themes";

export function generateThemeScript(): string {
  const validThemes = Object.keys(themes);

  const themesData: Record<
    string,
    { light: Record<string, string>; dark: Record<string, string> }
  > = {};

  Object.entries(themes).forEach(([name, theme]) => {
    themesData[name] = {
      light: theme.light,
      dark: theme.dark,
    };
  });

  const themesJson = JSON.stringify(themesData);
  const validThemesJson = JSON.stringify(validThemes);

  return `!function(){try{const e=${validThemesJson},t=${themesJson},n=localStorage.getItem('ui-preferences');let r='default';if(n){try{const s=JSON.parse(n);if(s&&s.state&&s.state.theme)r=s.state.theme}catch(c){}}if(!r||!e.includes(r))r='default';const o=localStorage.getItem('theme');let i=!1;'dark'===o?i=!0:'light'===o?i=!1:i=window.matchMedia('(prefers-color-scheme: dark)').matches;i?document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark');const a=t[r];if(a){const e=i?a.dark:a.light;for(const[t,n]of Object.entries(e))document.documentElement.style.setProperty(t,n)}}catch(e){}}();`;
}
