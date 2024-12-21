import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Checkbox, Grid, styled, TextField, useTheme, Step, Stepper, StepLabel, Typography, MenuItem } from "@mui/material";
import { Divider } from "../../components";
import { FlexAlignCenter, FlexBox } from "../../components/FlexBox";
import { Paragraph } from "../../components/Typography";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const ContentBox = styled(FlexAlignCenter)(({ theme }) => ({
  height: "100%",
  padding: "32px",
  backgroundColor: theme.palette.background.default,
}));

const IMG = styled("img")(() => ({ width: "100%" }));


const RegisterRoot = styled(FlexAlignCenter)(() => ({
  minHeight: "100vh !important",
  "& .card": { maxWidth: 650, margin: 16, borderRadius: 12 },
}));


const FirebaseRegister = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { createUserWithEmail, signInWithGoogle } = useAuth();

  const formSteps = [
    {
      fields: [
        {
          name: "firstname",
          label: "Firstname",
          type: "text",
          validation: { required: "Firstname is required" },
        }, {
          name: "lastname",
          label: "Lastname",
          type: "text",
          validation: { required: "Lastname is required" },
        }, {
          name: "email",
          label: "Email",
          type: "email",
          validation: { required: "Email is required" },
        },

        {
          name: "password",
          label: "Password",
          type: "password",
          validation: {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
            },
          },
        }, {
          name: "confirmpassword",
          label: "confirmpassword",
          type: "password",
          validation: {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
            },
          },
        },
      ],
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
 
  const onSubmit = async (data) => {
      // If it's the last step, submit the entire form
      try {
        setLoading(true);
        await createUserWithEmail(data.email, data.password);
        navigate("/");
        enqueueSnackbar("Register Successfully!", { variant: "success" });
      } catch (e) {
        setLoading(false);
        enqueueSnackbar(e.message, { variant: "error" });
      }
  
  }; // your form submit function which will invoke after successful validation
  const currentStepFields = formSteps[0].fields;



  return (
    <RegisterRoot>
      <Card className="card">

        <Grid container>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <ContentBox>
              <IMG src="/assets/SignUp.jpg" alt="" />
            </ContentBox>
          </Grid>

          <Grid item lg={7} md={7} sm={7} xs={12}>
            <Box p={4} height="100%">
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStepFields.map((field) => (
                  <React.Fragment key={field.name}>
                    {field.type === "select" ? (
                      <TextField
                        select
                        fullWidth
                        size="small"
                        name={field.name}
                        label={field.label}
                        variant="outlined"
                        {...register(field.name, field.validation)}
                        error={!!errors[field.name]}
                        helperText={errors[field.name] && errors[field.name].message}
                        sx={{
                          mb: 1.5,
                          ...(watch(field.name) && !errors[field.name]
                            ? { color: "green" }
                            : {}),
                        }}
                      >
                        {field.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <TextField
                        key={field.name}
                        fullWidth
                        size="small"
                        name={field.name}
                        type={field.type}
                        label={field.label}
                        variant="outlined"
                        {...register(field.name, field.validation)}
                        error={!!errors[field.name]}
                        helperText={errors[field.name] && errors[field.name].message}
                        sx={{
                          mb: 1.5,
                          ...(watch(field.name) && !errors[field.name]
                            ? { color: "green" }
                            : {}),
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}


              
                <Box sx={{ display: "flex" }}>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ my: 2 }}
                  >
                    Register
                  </LoadingButton>
                </Box>


                <Paragraph>
                  Already have an account?
                  <NavLink
                    to="/session/signin"
                    style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                  >
                    Login
                  </NavLink>
                </Paragraph>
              </form>

            </Box>
          </Grid>
        </Grid>
      </Card>
    </RegisterRoot>
  );
};

export default FirebaseRegister;
