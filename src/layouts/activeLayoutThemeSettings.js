import { themes } from "../theme/initThemes";
import layoutSettings from "./layoutSettings";
export const activeLayoutThemeSettings = {
  activeTheme: "blue",
  perfectScrollbar: false,
  themes: themes,
  layoutSettings,
  footer: {
    show: true,
    theme: "slateDark1",
  },
  secondarySidebar: {
    show: true,
    open: false,
    theme: "slateDark1", 
  },
};
