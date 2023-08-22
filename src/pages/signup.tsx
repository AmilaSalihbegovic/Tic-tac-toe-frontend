import React, { useState } from "react";
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
import { AuthButton } from "../components/GameButton";
import { AuthDescriptionTypography } from "../components/GameTypography";
import AlertMessage from "../components/AlertMessage";

function Signin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleNameChange = (value) => {
    setName(value);
  };
  const handleUsernameChange = (value) => {
    setUsername(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const handleSve = () => {
    const data = {
      name: name,
      email: username,
      password: password,
    };
    try{
      axios
      .post("http://localhost:3001/api/auth/signin", data)
      .then((result) => {
        const token = result.headers["X-auth-token"];
        localStorage.setItem("UserToken", token);
        const name = result.data.name;
        setAlert({ type: "success", message: result.data });
        navigate("/login");
      })
      .catch((err) => {
        setAlert({ type: "error", message: "Error while trying to register. Check your credentials." });
      });
    }catch(error){
      setAlert({ type: "error", message: "Error while trying to connect to server." });
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
      <AlertMessage type={alert.type} message={alert.message}/>
      <Container>
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
         <AuthDescriptionTypography title={"SIGNUP"} text={"Welcome! Please sign up to play!"}/>
          <Avatar sx={{ bgcolor: "primary.light", ml: 29 }}>
            <LockIcon />
          </Avatar>
          <Grid container spacing={1} padding={6}>
            <Grid item xs={6} md={4}>
              <Typography>Name:</Typography>
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField
                placeholder="Please enter your name"
                onChange={(e) => handleNameChange(e.target.value)}
              ></TextField>
            </Grid>
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
         <AuthButton handleSave={handleSve} text={"SIGNUP"}/>
          <Typography padding={1} marginTop={1}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#676768" }}
            >
              Login.
            </Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signin;
