import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikHelpers, useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { authThunks } from "../../reducers/auth/authSlice";
import { useAppSelector } from "../../common/hooks";
import { useActions } from "../../common/utils";
import { AuthRequestType } from "../../api/auth.api";
import { ResponseType } from "../../api/tasks.api";
import { selectCaptcha, selectIsLoggedIn } from "../../reducers/auth/authSelectors";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
  captcha?: string;
};

export const Login = () => {
  const { login } = useActions(authThunks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const captcha = useAppSelector(selectCaptcha);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: ""
    },
    onSubmit: (values, formikHelpers: FormikHelpers<AuthRequestType>) => {
      login({
        data: {
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
          captcha: values.captcha
        }
      })
        .unwrap()
        .catch((reason: ResponseType<{}>) => {
          reason.fieldsErrors?.forEach((item) => {
            formikHelpers.setFieldError(item.field, item.error);
          });
        });

      formik.resetForm();
    },
    validate: (values) => {
      /*const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            } else if (values.password.length < 3) {
                errors.password = 'Must be more than 3 symbols'
            } else if (!values.password) {
                errors.password = 'Password required'
            }
            return errors*/
    }
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>

            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>

            <FormGroup>
              <TextField
                id="email"
                label="Email"
                margin="normal"
                color={"warning"}
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
              <TextField
                id="password"
                type="password"
                label="Password"
                margin="normal"
                color={"warning"}
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                id="rememberMe"
                label={"Remember me"}
                control={<Checkbox color={"warning"} />}
                {...formik.getFieldProps("rememberMe")}
              />

              {
                captcha && <img src={captcha} alt="captcha" />
              }
              {
                captcha &&
                <TextField
                  id="captcha"
                  type="text"
                  label="Captcha"
                  margin="normal"
                  color={"warning"}
                  style={{marginBottom: '20px'}}
                  {...formik.getFieldProps("captcha")}
                />
              }

              <Button type={"submit"} variant={"contained"} color={"warning"}>
                Login
              </Button>

            </FormGroup>

          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
