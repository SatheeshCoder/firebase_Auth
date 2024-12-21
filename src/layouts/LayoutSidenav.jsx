import { Box, styled, Switch, useTheme } from "@mui/material";
import { themeShadows } from "../theme/themeColors";
import useSettings from "../hooks/useSettings";
import { sidenavCompactWidth, sideNavWidth } from "../utils/constant";
import { convertHexToRGB } from "../utils/utils";
import React from "react";
import Brand from "../components/Brand";
import Sidenav from "../components/Sidenav";

// styled components
const SidebarNavRoot = styled(Box)(({ theme, width, bg, img }) => ({
  top: 0,
  left: 0,
  zIndex: 111,
  width: width,
  height: "100vh",
  position: "fixed",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "top",
  boxShadow: themeShadows[8],
  backgroundRepeat: "no-repeat",
  color: "#fff",
  transition: "all 250ms ease-in-out",
  background: " rgb(34, 198, 130)",
  "&:hover": {
    width: sideNavWidth,
    "& .sidenavHoverShow": { display: "block" },
    "& .compactNavItem": {
      width: "100%",
      maxWidth: "100%",
      "& .nav-bullet": { display: "block" },
      "& .nav-bullet-text": { display: "none" },
    },
  },
}));

const NavListBox = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const LayoutSidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const leftSidebar = settings.layoutSettings.leftSidebar;
  const { mode, bgImgURL } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case "compact":
        return sidenavCompactWidth;

      default:
        return sideNavWidth;
    }
  };
  const primaryRGB = theme.palette.primary.main;

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layoutSettings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === "compact" ? "full" : "compact" });
  };

  return (
    <SidebarNavRoot img={bgImgURL} bg={primaryRGB} width={getSidenavWidth()}>
      <NavListBox>
        <Brand>
          <Switch
            size="small"
            color="secondary"
            onChange={handleSidenavToggle}
            checked={leftSidebar.mode !== "full"}
            sx={{ display: { md: "block", xs: "none" } }}
          />
        </Brand>

        <Sidenav />
      </NavListBox>
    </SidebarNavRoot>
  );
};

export default React.memo(LayoutSidenav);
