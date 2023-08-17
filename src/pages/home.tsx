import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import CustomTheme from "../theme";
import xo from "../assets/xo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  HomeTypography,
  MotionTypography,
  WhiteTypography,
} from "../components/GameTypography";
import AlertMessage from "../components/AlertMessage";
import {
  JoinGame,
  OnePlayerGameButton,
  TwoUserGameButton,
} from "../components/GameButton";

const Home = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [gameId, setGameId] = useState("");

  const HandleOnePlayerGame = async () => {
    try {
      const data = sessionStorage.getItem("UserToken");
      console.log(data);
      if (!data) {
        setAlert({
          type: "error",
          message: "You must login to be able to play! :)",
        });
        navigate("/login");
      } else {
        const response = await axios.get("http://localhost:3001/api/user/me", {
          headers: {
            "X-auth-token": data,
          },
        });
        if (response.status !== 200) {
          setAlert({
            type: "error",
            message:
              "An error occured while trying to start a game, please check your credentials and try again! :)",
          });
        } else {
          console.log(response.data._id);
          const gameData = {
            playerX: {
              playerID: response.data._id,
              name: "X",
            },
            playerO: {
              name: "O",
            },
            currentPlayer: "X",
          };
          console.log(gameData);
          const createGame = await axios.post(
            "http://localhost:3001/api/game",
            gameData
          );
          if (createGame.status === 200) {
            sessionStorage.setItem("X", createGame.data.playerX.playerID);
            sessionStorage.setItem("O", createGame.data.playerO.playerID);
            const id = createGame.data._id;
            navigate(`/room/${id}`);
          } else {
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleTwoPlayerGame = async () => {
    try {
      const data = sessionStorage.getItem("UserToken");
      if (!data) {
        setAlert({
          type: "error",
          message: "You must login to be able to play! :)",
        });
        navigate("/login");
      } else {
        const response = await axios.get("http://localhost:3001/api/user/me", {
          headers: {
            "X-auth-token": data,
          },
        });
        if (response.status !== 200) {
          setAlert({
            type: "error",
            message:
              "An error occured while trying to start a game, please check your credentials and try again! :)",
          });
        } else {
          console.log(response.data._id);
          const gameData = {
            playerX: {
              playerID: response.data._id,
              name: "X",
            },
            playerO: {
              playerID: null,
              name: "O",
            },
            currentPlayer: "X",
          };
          console.log(gameData);
          const createGame = await axios.post(
            "http://localhost:3001/api/game",
            gameData
          );
          if (createGame.status === 200) {
            sessionStorage.setItem("X", createGame.data.playerX.playerID);
            sessionStorage.setItem("O", createGame.data.playerO.playerID);
            const id = createGame.data._id;
            setGameId(id);
            navigate(`/room/two/${id}`);
          } else {
            navigate("/login");
          }
        }
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `An error occured while trying to start a game ${error}`,
      });
    }
  };
  const JoinTwoPlayerGame = async () => {
    try {
      const data = sessionStorage.getItem("UserToken");
      if (!data) {
        setAlert({
          type: "error",
          message: "You must login to be able to play! :)",
        });
        navigate("/login");
      } else {
        const response = await axios.get("http://localhost:3001/api/user/me", {
          headers: {
            "X-auth-token": data,
          },
        });
        if (response.status !== 200) {
          setAlert({
            type: "error",
            message:
              "An error occured while trying to start a game, please check your credentials and try again! :)",
          });
        } else {
          const userID = response.data._id;
          const joinGameResponse = await axios.post(
            "http://localhost:3001/api/game/" + `${gameId}`,
            { playerID: userID }
          );
          console.log(joinGameResponse);
          if ((joinGameResponse.data = "Player has joined the game.")) {
            navigate(`/room/two/${gameId}`);
          } else {
            setAlert({
              type: "error",
              message: "An error occured while trying to start a game",
            });
          }
        }
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `An error occured while trying to start a game ${error}`,
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${xo})`,
        backgroundRepeat: "repeat",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        color: "white",
      }}
    >
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <Container>
          <HomeTypography title={"WELCOME"}></HomeTypography>
          <MotionTypography
            text={"Start a new tic tac toe game"}
          ></MotionTypography>
          <WhiteTypography text={"Please choose game mood"}></WhiteTypography>
          <AlertMessage type={alert.type} message={alert.message} />
          <OnePlayerGameButton
            HandleOnePlayerGame={HandleOnePlayerGame}
            text={"One player game"}
          />
          <TwoUserGameButton
            HandleTwoPlayerGame={HandleTwoPlayerGame}
            text={"Two players game"}
          />
          <input
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            style={{
              marginTop: CustomTheme.spacing(7),
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <JoinGame JoinTwoPlayerGame={JoinTwoPlayerGame} text={"Join game"} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Home;
