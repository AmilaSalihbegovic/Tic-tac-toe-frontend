import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Avatar,
  Grid,
  TextField,
} from "@mui/material";
import customTheme from "../theme";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertMessage from "../components/AlertMessage";
import { AuthButton } from "../components/GameButton";
import { AuthDescriptionTypography } from "../components/GameTypography";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleUsernameChange = (value) => {
    setUsername(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSave = () => {
    const data = {
      email: username,
      password: password,
    };
    try {
      axios
        .post("http://localhost:3001/api/auth/login", data)
        .then((response) => {
          const token = response.data;
          sessionStorage.setItem("UserToken", token);
          setAlert({ type: "success", message: response.data });
          navigate("/");
        })
        .catch((err) => {
          setAlert({
            type: "error",
            message: "Error while trying to login. Check your credentials.",
          });
        });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Error while trying to connect to server.",
      });
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="primary.light">
            Tic tac toe{" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <AlertMessage type={alert.type} message={alert.message} />
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            height: 550,
            position: "relative",
            mt: customTheme.spacing(5),
            ml: "auto",
            mr: "auto",
            borderRadius: 2,
            boxShadow: "0px 3px 6px rgba(255, 255, 255, 0.16)",
            backgroundColor: "primary.dark",
          }}
        >
          <AuthDescriptionTypography
            title={"LOGIN"}
            text={"Welcome back! Login to play!"}
          />
          <Avatar sx={{ bgcolor: "primary.light", ml: 29 }}>
            <LockIcon />
          </Avatar>
          <Grid
            container
            spacing={1}
            padding={6}
            marginTop={3}
            marginBottom={3}
          >
            <Grid item xs={6} md={4}>
              <Typography>Email:</Typography>
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField
                placeholder="Please enter your username"
                onChange={(e) => handleUsernameChange(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography>Password:</Typography>
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField
                placeholder="Please enter your password"
                onChange={(e) => handlePasswordChange(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>
          <AuthButton handleSave={handleSave} text={"LOGIN"} />
          <Typography padding={1} marginTop={3}>
            Dont't have an account?{" "}
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "#676768" }}
            >
              Sign up.
            </Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
