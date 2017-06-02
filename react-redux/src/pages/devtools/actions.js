export function themeChanged(themeName) {
  return {
    type: 'DEVTOOLS_THEME_CHANGED',
    name: themeName,
  };
}
