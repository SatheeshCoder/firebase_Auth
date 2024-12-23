import { Box, styled, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import Suspense from "../components/Suspense";
import useSettings from "../hooks/useSettings";
import { sidenavCompactWidth, sideNavWidth } from "../utils/constant";
import React, { useEffect, useRef } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import SidenavTheme from "../components/SidenavTheme";
import LayoutSidenav from "./LayoutSidenav";
import LayoutTopbar from "./LayoutTopbar";
import LayoutSettings from "./layoutSettings";

// Styled components
const LayoutRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.default,
}));

const ContentBox = styled(Box)({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between",
});

const StyledScrollBar = styled(Scrollbar)({
  flexGrow: "1",
  height: "100%",
  display: "flex",
  position: "relative",
  flexDirection: "column",
});

const LayoutContainer = styled(Box)(({ width, open }) => ({
  flexGrow: "1",
  height: "100vh",
  display: "flex",
  marginLeft: width,
  overflow: "hidden",
  verticalAlign: "top",
  position: "relative",
  flexDirection: "column",
  transition: "all 0.3s ease",
  marginRight: open ? 50 : 0,
}));

const Layout = () => {
  const { settings, updateSettings } = useSettings();
  const { layoutSettings, secondarySidebar } = settings;

  // Retrieve the topbar theme
  const topbarTheme = settings.themes[LayoutSettings.topbar.theme];

  // Extract left sidebar settings
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layoutSettings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case "full":
        return sideNavWidth;
      case "compact":
        return sidenavCompactWidth;
      default:
        return "0px";
    }
  };

  const theme = useTheme();
  const sidenavWidth = getSidenavWidth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

  // Responsive sidebar logic
  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layoutSettings.leftSidebar.mode;

    if (settings.layoutSettings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layoutSettings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <LayoutRoot className={layoutClasses}>
      {/* Sidebar */}
      {showSidenav && sidenavMode !== "close" && (
        <SidenavTheme>
          <LayoutSidenav />
        </SidenavTheme>
      )}

      {/* Main content */}
      <LayoutContainer width={sidenavWidth} open={secondarySidebar.open}>
        {/* Fixed topbar */}
        {layoutSettings.topbar.show && layoutSettings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <LayoutTopbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        {/* Scrollable content */}
        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {/* Non-fixed topbar */}
            {layoutSettings.topbar.show && !layoutSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutTopbar />
              </ThemeProvider>
            )}

            {/* Page content */}
            <Box flexGrow={1} position="relative">
              <Suspense>
                <Outlet />
              </Suspense>
            </Box>

            {/* Footer */}
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </StyledScrollBar>
        )}

        {/* Non-scrollable content */}
        {!settings.perfectScrollbar && (
          <ContentBox>
            {layoutSettings.topbar.show && !layoutSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutTopbar />
              </ThemeProvider>
            )}

            <Box flexGrow={1} position="relative">
              <Suspense>
                <Outlet />
              </Suspense>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </ContentBox>
        )}

        {/* Fixed footer */}
        {settings.footer.show && settings.footer.fixed && <Footer />}
      </LayoutContainer>
    </LayoutRoot>
  );
};

export default React.memo(Layout);
