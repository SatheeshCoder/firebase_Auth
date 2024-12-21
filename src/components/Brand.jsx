import { Box, styled } from "@mui/material";
import { FlexBetween } from "../components/FlexBox";
import { Span } from "../components/Typography";

const BrandRoot = styled(FlexBetween)(() => ({
  padding: "20px 18px 20px 29px",
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 25,
  display: mode === "compact" ? "none" : "block",
}));

const Brand = ({ children }) => {
  const leftSidebar = 240;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box gap={1} display="flex" alignItems="center">

        <StyledSpan className="sidenavHoverShow">
          Rhombuzz
        </StyledSpan>
      </Box>

      {/* <Box className="sidenavHoverShow" sx={{ display: mode === "compact" ? "none" : "block" }}>
        {children || null}
      </Box> */}
    </BrandRoot>
  );
};

export default Brand;
