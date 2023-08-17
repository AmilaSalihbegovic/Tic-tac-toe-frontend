import { Alert, AlertTitle, Box } from '@mui/material'
import React, { useState } from 'react'
import CustomTheme from '../theme'
import GameBox from './GameBox'
import AlertMessage from './AlertMessage'

const GameBoard = ({gameBoard, handleClick, isBoxClicked, alert}) => {
  return (
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
 <AlertMessage type={alert.type} message={alert.message} />
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
  )
}

export default GameBoard