import { Home, PowerSettingsNew } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Icon,
  IconButton,
  MenuItem,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FlexBetween } from "../components/FlexBox";
import MenuTopbar from "../components/Menu";
import { themeShadows } from "../theme/themeColors";
import { Span } from "../components/Typography";
import useAuth from "../hooks/useAuth";
import useSettings from "../hooks/useSettings";
import { topBarHeight } from "../utils/constant";
import React from "react";
import { useNavigate } from "react-router-dom";

// styled components
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease",
});

const TopbarContainer = styled(FlexBetween)(({ theme }) => ({
  height: "100%",
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 },
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" },
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  gap: 8,
  minWidth: 185,
  display: "flex",
  alignItems: "center",
  "& a": {
    gap: 8,
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": {
    marginRight: "10px",
    color: theme.palette.text.primary,
  },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const LayoutTopbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layoutSettings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layoutSettings } = settings;
    let mode;

    if (isMdScreen) {
      mode = layoutSettings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layoutSettings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>

          <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox>
        </Box>

        <Box display="flex" alignItems="center">
          <MenuTopbar
            menuButton={
              <UserMenu>
                <Span display={{ sm: "inline", xs: "none" }}>
                  Hi <strong>{user.name}</strong>
                </Span>

                <Avatar src={user.avatar} />
              </UserMenu>
            }
          >
            <StyledItem onClick={() => navigate("/")}>
              <Home fontSize="small" />
              <Span> Home </Span>
            </StyledItem>

            <StyledItem onClick={logout}>
              <PowerSettingsNew fontSize="small" />
              <Span> Logout </Span>
            </StyledItem>
          </MenuTopbar>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(LayoutTopbar);
