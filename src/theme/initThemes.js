import { createTheme } from "@mui/material";
import { forEach, merge } from "lodash";
import { themeColors } from "./themeColors";
import themeOptions from "./themeOptions";

function createThemes() {
  let themes = {};
  console.log(themeColors);
  
  const baseTheme = {
    typography: {
      fontWeightBold: 700,
      fontWeightRegular: 400,
      fontWeightLight: 300,
    },
  };
  forEach(themeColors, (value, key) => {
    themes[key] = createTheme(merge({}, baseTheme, themeOptions, value));
  });

  return themes;
}

export const themes = createThemes();

console.log(themes);
// Default themes created
export { createThemes }; // Explicitly export the createThemes function
