import { ThemeProvider } from "@emotion/react";
import { Button, Container, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTheme from "../theme";
import xo from "../assets/xo.png";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GameTypography } from "../components/GameTypography";
import GameHistory from "../components/GameHistory";
import GameBoard from "../components/GameBoard";

const Room = () => {
  const { id } = useParams();
  const [isClicked, setIsClicked] = useState([]);
  const [game, setGame] = useState({});
  const [moves, setMoves] = useState([]);
  const [gameBoard, setGameBoard] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [status, setStatus] = useState();
  const navigate = useNavigate();

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
      } catch (error) {
        return new Error(
          `Unable to get game with given ID because an error ${error} occured.`
        );
      }
    };
    fetchGameDetails();
  }, [isClicked]);
  const handleClick = async (index) => {
    if (status !== "in progress") {
      return setAlert({
        type: "error",
        message: "The game has ended.",
      });
    }
    if (!isClicked.includes(index)) {
      setIsClicked((prevGame) => [...prevGame, index]);
      return handleUserMove(index);
    }
  };
  const handleUserMove = async (index) => {
    const data = {
      playerID: sessionStorage.getItem("X"),
      row: Math.floor(index / 3),
      col: index % 3,
    };
    if (
      moves.length !== 0 &&
      data.playerID === moves[moves.length - 1].player
    ) {
      setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 3000);
      return setAlert({
        type: "error",
        message: "Please wait for your turn!",
      });
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/game/move" + `/${id}`,
        data
      );
      if (response.status === 400 || response.status === 403) {
        return setAlert({ type: "error", message: response.data });
      }
      if (response.data === "Move is made") {
        return await handleAIMove();
      }
      setAlert({ type: "success", message: response.data });
    } catch (error) {
      setAlert({ type: "error", message: "Error while trying to make move." });
    }
  };
  const handleAIMove = async () => {
    const aiData = {
      playerID: null,
      row: 0,
      col: 0,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/game/move" + `/${id}`,
        aiData
      );
      if (response.status === 400 || response.status === 403) {
        return setAlert({ type: "error", message: response.data });
      }
      if (
        response.data.lastMoveRow !== null &&
        response.data.lastMoveCol !== null
      ) {
        const aiRow = response.data[0];
        const aiCol = response.data[1];
        setIsClicked((prevGame) => [...prevGame, aiRow * 3 + aiCol]);
      }
      if (response.data === "Player O has won!") {
        setAlert({ type: "success", message: response.data });
      }
    } catch (error) {
      setAlert({ type: "error", message: error });
    }
  };
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
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
          <Button onClick={handleLogout} sx={{ color: "primary.light" }}>
            Exit
          </Button>
          <GameBoard
            gameBoard={gameBoard}
            handleClick={handleClick}
            isBoxClicked={isBoxClicked}
            alert={alert}
          />
        </Container>
        <GameHistory status={status} historyMove={moves} />
      </ThemeProvider>
    </div>
  );
};

export default Room;
