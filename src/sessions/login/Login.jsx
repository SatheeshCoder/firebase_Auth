import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Grid, styled, TextField, useTheme } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FlexAlignCenter, FlexBox } from "../../components/FlexBox";
import { Paragraph, Span } from "../../components/Typography";
import { Divider } from "../../components";
import useAuth from "../../hooks/useAuth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import * as Yup from "yup";

// Styled Components
const GoogleButton = styled(Button)(({ theme }) => ({
  color: "rgba(0, 0, 0, 0.87)",
  boxShadow: theme.shadows[3],
  backgroundColor: "#e0e0e0",
  "&:hover": { backgroundColor: "#d5d5d5" },
}));

const FirebaseRoot = styled(FlexAlignCenter)(({ theme }) => ({
  minHeight: "100vh !important",
  "& .card": { maxWidth: 800, margin: "1rem" },
  "& .cardLeft": {
    color: "#fff",
    height: "100%",
    display: "flex",
    padding: "32px 56px",
    flexDirection: "column",
    backgroundSize: "cover",
    background: `${theme.palette.primary.main} url(/assets/images/bg-3.png) no-repeat`,
    [theme.breakpoints.down("sm")]: { minWidth: 200 },
    "& img": { width: 32, height: 32 },
  },
  "& .mainTitle": { fontSize: 18, lineHeight: 1.3, marginBottom: 24 },
  "& .features .item": {
    position: "relative",
    marginBottom: 12,
    paddingLeft: 16,
    "&::after": {
      top: 8,
      left: 0,
      width: 4,
      height: 4,
      content: '""',
      borderRadius: 4,
      position: "absolute",
      backgroundColor: theme.palette.error.main,
    },
  },
}));

// Initial Login Credentials
const initialValues = {
  email: "",
  password: "",
  remember: true,
};

// Form Field Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email address").required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be 6 characters long")
    .required("Password is required!"),
});

const FirebaseLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await signInWithEmail(values.email, values.password);
      navigate(state ? state.from : "/");
      enqueueSnackbar("Logged In Successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };
  const features = [
    "JWT, Firebase & Auth0 Authentication",
    "Clean & Organised Code",
    "Limitless Pages & Components",
    "Customizable Themes",
    "Responsive Design",
  ];
  return (
    <FirebaseRoot>
      <Card className="card">
        <Grid container>
          {/* Left Section */}
          <Grid item sm={6} xs={12}>
            <div className="cardLeft">

              <h1 className="mainTitle">Welcome Back!</h1>
              <div className="features">
              {features.map((feature, index) => (
                <div className="item" key={index}>
                  {feature}
                </div>
              ))}</div>


            </div>
          </Grid>

          {/* Right Section */}
          <Grid item sm={6} xs={12}>
            <Box px={4} pt={4}>
              <GoogleButton
                fullWidth
                variant="contained"
                onClick={handleGoogleLogin}
                startIcon={<img src="/assets/images/logos/google.svg" alt="google" />}
              >
                Sign In With Google
              </GoogleButton>
            </Box>
            <Divider sx={{ mt: 3, px: 4 }} text="Or" />

            <Box p={4}>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox alignItems="center" gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Login
                    </LoadingButton>

                    <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Register
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FirebaseRoot>
  );
};

export default FirebaseLogin;
