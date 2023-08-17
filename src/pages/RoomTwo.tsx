import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomTheme from "../theme";
import { Alert, AlertTitle, Box, Container, CssBaseline } from "@mui/material";
import { GameTypography } from "../components/GameTypography";
import GameBox from "../components/GameBox";
import xo from "../assets/xo.png";
import axios from "axios";
import { io } from "socket.io-client";

const RoomTwo = () => {
  const { id } = useParams();
  const [isClicked, setIsClicked] = useState([]);
  const [game, setGame] = useState({});
  const [moves, setMoves] = useState([]);
  const [gameBoard, setGameBoard] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [status, setStatus] = useState();
  const [users, setUsers] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [currentTurn, setCurrentTurn] = useState("X");

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/game/" + `${id}`
        );
        setGame(response.data);
        setGameBoard(response.data.board);
        setMoves(response.data.moves);
        setStatus(response.data.status);
        setCurrentPlayer(response.data.playerX.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameDetails();
  }, [isClicked]);
  const handleClick = async (index) => {
    if (!isClicked.includes(index)) {
      setIsClicked((prevGame) => [...prevGame, index]);
      handleMove(index);
    }
  };
  const handleMove = async (index) => {
    if (currentPlayer !== currentTurn) {
      setAlert({
        type: "error",
        message: "It's not your turn to make a move.",
      });
      return;
    }
  
    const gameResponse = await axios.get(
      `http://localhost:3001/api/game/${id}`
    );
    console.log(gameResponse);
    if (gameResponse.status === 200) {
      const playerO = gameResponse.data.playerO.playerID;
      const playerX = gameResponse.data.playerX.playerID;
      console.log(gameResponse.data.board);
      setGame(gameResponse);
      const user = sessionStorage.getItem("UserToken");
      const userResponse = await axios.get(
        "http://localhost:3001/api/user/me",
        {
          headers: {
            "X-auth-token": user,
          },
        }
      );
      if (userResponse.status === 200) {
        setUsers(userResponse.data._id);
      }

      console.log(playerO);
      console.log(playerX);
      const playerID = isClicked.length % 2 === 0 ? playerX : playerO;
      console.log("playerID", playerID);
      const data = {
        playerID: playerID,
        row: Math.floor(index / 3),
        col: index % 3,
      };
      console.log("data:", data);
      try {
        const response = await axios.post(
          "http://localhost:3001/api/game/move" + `/${id}`,
          data
        );
        if (response.status === 400 || response.status === 403) {
          setAlert({ type: "error", message: response.data });
        } else {
          if (response.data === "Move is made") {
            setAlert({ type: "success", message: response.data });
            setCurrentTurn(
              currentPlayer === "X"
                ? "O"
                : "X"
            );
            setCurrentPlayer(currentPlayer==="X"?"O":"X");
          } else {
            console.log("response data:", response.data);
            setAlert({ type: "success", message: response.data });
          }
        }
      } catch (error) {
        setAlert({
          type: "error",
          message: "Error while trying to connect to server.",
        });
      }
    }
  };
  const isBoxClicked = (index) => {
    return isClicked.includes(index);
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
          <GameTypography title={"Tic tac toe"}></GameTypography>
          <Box
            sx={{
              width: "100%",
              maxWidth: 600,
              height: 610,
              position: "relative",
              mt: CustomTheme.spacing(5),
              ml: "auto",
              mr: "auto",
              borderRadius: 2,
              boxShadow: "0px 3px 6px rgba(255, 255, 255, 0.16)",
              backgroundColor: "primary.dark",
            }}
          >
            {alert.type === "error" && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {alert.message}
              </Alert>
            )}
            {alert.type === "success" && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                {alert.message}
              </Alert>
            )}
            {gameBoard.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cellValue, colIndex) => (
                  <GameBox
                    key={colIndex}
                    onClick={() => handleClick(rowIndex * 3 + colIndex)}
                    isClicked={isBoxClicked(rowIndex * 3 + colIndex)}
                    value={cellValue}
                  />
                ))}
              </div>
            ))}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default RoomTwo;
