import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomTheme from "../theme";
import {Container, CssBaseline } from "@mui/material";
import { GameTypography, WhiteTypography } from "../components/GameTypography";
import xo from "../assets/xo.png";
import axios from "axios";
import GameHistory from "../components/GameHistory";
import GameBoard from "../components/GameBoard";

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
  const [historyMove, setHistoryMove] = useState([]);


  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/game/" + `${id}`
        );
        setGame(response.data);
        setGameBoard(response.data.board);
        setMoves(response.data.moves);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameDetails();
    const intervalId = setInterval(fetchGameDetails, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [id]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/game/history/" + `${id}`
        );
        if (response.status === 200 && response.data !== null) {
          const { status, moves } = response.data;
          setStatus(status);
          setHistoryMove(moves);

        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameHistory();
  }, [isClicked]);
  const handleClick = async (index) => {
    if (!isClicked.includes(index)) {
      setIsClicked((prevGame) => [...prevGame, index]);
      handleMove(index);
    }
  };
  const handleMove = async (index) => {
    const gameResponse = await axios.get(
      `http://localhost:3001/api/game/${id}`
    );
    console.log(gameResponse);
    if (gameResponse.status === 200) {
      const playerO = gameResponse.data.playerO.playerID;
      const playerX = gameResponse.data.playerX.playerID;
      setGame(gameResponse);
      let playerID;
      if (users === playerX) {
        playerID = playerX;
        setCurrentPlayer("X");
      } else if (users === playerO) {
        playerID = playerO;
        setCurrentPlayer("O");
      } else {
        setAlert({
          type: "error",
          message: "You are not a player in this game.",
        });
        return;
      }
      const data = {
        playerID: playerID,
        row: Math.floor(index / 3),
        col: index % 3,
      };
      console.log("data:", data);
      if (moves.length !== 0 && playerID === moves[moves.length - 1].player) {
        setAlert({
          type: "error",
          message: "Please wait for your turn!",
        });
        return;
      } else {
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
              setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
            } else {
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
        <GameTypography title={"Tic tac toe game:"}></GameTypography>
        <WhiteTypography text={id}></WhiteTypography>
          <GameBoard gameBoard={gameBoard} handleClick={handleClick} isBoxClicked={isBoxClicked} alert={alert}/>
        </Container>
        <GameHistory status={status} historyMove={historyMove}/>
      </ThemeProvider>
    </div>
  );
};

export default RoomTwo;
