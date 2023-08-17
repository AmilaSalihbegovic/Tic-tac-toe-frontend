import React from "react";
import { Box } from "@mui/material";
import x from "../assets/X.png";
import o from "../assets/o.png";

const GameBox = ({ onClick, isClicked, value }) => {

  const imageSource =
   value !== ""
    ? value === "X"
      ? x
      : o
    : null;
 
  return (
    <Box
      sx={{
        display: "inline-block",
        width: "100%",
        maxWidth: 200,
        height: 200,
        position: "relative",
        boxShadow: "0px 3px 6px rgba(255, 255, 255, 0.16)",
        backgroundColor: "primary.light",
        border: "1px solid #000000",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {isClicked && imageSource&& (
        <img
          src={imageSource}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </Box>
  );
};

export default GameBox;