import React, { useEffect, useState } from "react";
import xo from "../assets/xo.png";
import { ThemeProvider } from "@emotion/react";
import CustomTheme from "../theme";
import { Button, Container, CssBaseline } from "@mui/material";
import { GameTypography } from "../components/GameTypography";
import { AuthButton } from "../components/GameButton";
import { useNavigate, useParams } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import axios from "axios";
import GameHistory from "../components/GameHistory";

const History = () => {
  const [historyMoves, setHistoryMoves] = useState([]);
  const [historyStatus, setHistoryStatus] = useState("");
  const [gameBoard, setGameBoard] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(true);
  const {id} = useParams();


  useEffect(()=>{
    const handleHistory = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/game/${id}`
          );
          if (!response) {
            setAlert({
              type: "error",
              message:
                "Could not find the game. Please check game ID and try again.:)",
            });
            return;
          }
          if (response.data.status === "in progress") {
            setAlert({
              type: "error",
              message: "Game is still on going. Maybe try another one?",
            });
            return;
          } else {
            setGameBoard(response.data.board);
            setHistoryMoves(response.data.moves);
            setHistoryStatus(response.data.status);
          }
        } catch (error) {
          console.log(error);
        }
      };
      handleHistory();
  }, []);
 
  const isBoxClicked = () => {
    return true;
  };
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const handleClick = () => {
    setAlert({
      type: "error",
      message:
        "You cannot play a game that is already finished. If you want to play, please go back to home page and start a new game.",
    });
    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 3000);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${xo})`,
        backgroundRepeat: "repeat",
        width: "100%",
        height: "120vh",
        display: "flex",
        justifyContent: "center",
        color: "white",
      }}
    >
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline />
        <Container>
          <GameTypography title={"Game history"}></GameTypography>
          <Button onClick={handleLogout} sx={{ color: "primary.light" }}>
            Exit
          </Button>
          {/* <Button
            onClick={handleHistory}
            sx={{
              marginTop: CustomTheme.spacing(1),
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              justifyContent: "center",
              color: "primary.dark",
              backgroundColor: "text.primary",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            Search game history
          </Button> */}
          <GameBoard
            gameBoard={gameBoard}
            handleClick={handleClick}
            isBoxClicked={isBoxClicked}
            alert={alert}
          />
        </Container>
        <GameHistory status={historyStatus} historyMove={historyMoves} />
        
      </ThemeProvider>
    </div>
  );
};

export default History;
