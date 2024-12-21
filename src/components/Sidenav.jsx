import { styled } from "@mui/material";
import useSettings from "../hooks/useSettings";
import { navigations } from "../navigation";
import { Fragment, useCallback } from "react";
import Scrollbar from "react-perfect-scrollbar";
import VerticalNav from "./VerticalNav";
import useAuth from "../hooks/useAuth";

// styled components
const StyledScrollBar = styled(Scrollbar)({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
});

const SideNavMobile = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  width: "100vw",
  position: "fixed",
  background: "rgba(0, 0, 0, 0.54)",
  [theme.breakpoints.up("lg")]: { display: "none" },
}));

const Sidenav = ({ children }) => {
  const { user } = useAuth();
  const { settings, updateSettings } = useSettings();
  const { mode } = settings;

  const updateSidebarMode = useCallback(
    (sidebarSettings) => {
      let activeLayoutSettingsName = settings.activeLayout + "Settings";
      let activeLayoutSettings = settings[activeLayoutSettingsName];

      updateSettings({
        ...settings,
        [activeLayoutSettingsName]: {
          ...activeLayoutSettings,
          leftSidebar: { ...activeLayoutSettings.leftSidebar, ...sidebarSettings },
        },
      });
    },
    [settings, updateSettings]
  );

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <VerticalNav
          items={navigations}
          onCloseSidebar={() => updateSidebarMode({ mode: "close" })}
        />
      </StyledScrollBar>

      <SideNavMobile mode={mode} onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
};

export default Sidenav;
