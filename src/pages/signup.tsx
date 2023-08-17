import React, { useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import {Alert, AlertTitle} from '@mui/material';

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
        //console.log(result.headers);
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
          <Typography
            variant="h5"
            align="center"
            paddingTop={4}
            fontFamily="Roboto"
            fontWeight="700"
          >
            SIGN UP
          </Typography>
          <Typography
            paragraph
            align="center"
            fontFamily="Roboto"
            fontWeight="500"
          >
            Please register to proceed!
          </Typography>
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
          <Button
            sx={{
              ml: 26,
              color: "primary.dark",
              backgroundColor: "primary.light",
              "&:hover": {
                backgroundColor: "primary.light",
                opacity: [0.5, 0.9, 0.7],
              },
              pl: 2,
              pr: 2,
              fontFamily: "Roboto",
              fontWeight: "700",
              letterSpacing: 1,
            }}
            onClick={() => handleSve()}
          >
            Sign up
          </Button>
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
