import { CssBaseline, ThemeProvider } from "@mui/material";
import { themes } from "./initThemes"; // Assuming themes are exported correctly

const Theme = ({ children }) => {
console.log(themes);

  return (
    <ThemeProvider theme={themes.blue}> {/* Use the entire theme object */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
