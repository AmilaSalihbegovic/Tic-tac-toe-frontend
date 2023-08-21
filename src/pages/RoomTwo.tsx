import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomTheme from "../theme";
import { Button, Container, CssBaseline } from "@mui/material";
import { GameTypography, WhiteTypography } from "../components/GameTypography";
import xo from "../assets/xo.png";
import axios from "axios";
import GameHistory from "../components/GameHistory";
import GameBoard from "../components/GameBoard";
import { io } from "socket.io-client";
import { AuthButton } from "../components/GameButton";

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
  const socket = io("http://localhost:3001");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("joinGame", id);
    socket.on("gameState", ({ board, moves, status }) => {
      setGameBoard(board);
      setMoves(moves);
      setStatus(status);
    });
  }, [isClicked]);
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
      if (moves.length !== 0 && playerID === moves[moves.length - 1].player) {
        setAlert({
          type: "error",
          message: "Please wait for your turn!",
        });
        setTimeout(() => {
          setAlert({ type: "", message: "" });
        }, 3000);
      } else {
      socket.emit("makeMove", { id, data });
      }
    }
  };
  const handleLogout=()=>{
    sessionStorage.clear();
    navigate("/");
  }
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
          <Button onClick={handleLogout} sx={{color:"primary.light"}}>Exit</Button>
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

export default RoomTwo;
