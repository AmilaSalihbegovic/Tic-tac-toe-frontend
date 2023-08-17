import { Button } from '@mui/material'
import React from 'react'
import CustomTheme from '../theme'

export const OnePlayerGameButton = ({HandleOnePlayerGame, text}) => {
  return (
    <Button
    sx={{
      mt: CustomTheme.spacing(7),
      ml: "auto",
      mr: "auto",
      color: "primary.dark",
      backgroundColor: "text.secondary",
      "&:hover": {
        backgroundColor: "primary.light",
        opacity: [0.5, 0.9, 0.7],
      },
      pl: 2.5,
      pr: 2.5,
      pt: 2,
      pb: 2,
      fontFamily: "Roboto",
      fontWeight: "700",
      letterSpacing: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={() => HandleOnePlayerGame()}
  >
    {text}
  </Button>
    )
}
export const TwoUserGameButton = ({HandleTwoPlayerGame, text})=>{
    return(
        <Button
        sx={{
          mt: CustomTheme.spacing(7),
          ml: "auto",
          mr: "auto",
          color: "primary.dark",
          backgroundColor: "text.secondary",
          "&:hover": {
            backgroundColor: "primary.light",
            opacity: [0.5, 0.9, 0.7],
          },
          p: 2,
          fontFamily: "Roboto",
          fontWeight: "700",
          letterSpacing: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => HandleTwoPlayerGame()}
      >
        {text}
      </Button>
    )
}
export const JoinGame=({JoinTwoPlayerGame, text})=>{
    return(
        <Button
        sx={{
          mt: CustomTheme.spacing(2),
          ml: "auto",
          mr: "auto",
          color: "primary.dark",
          backgroundColor: "text.secondary",
          "&:hover": {
            backgroundColor: "primary.light",
            opacity: [0.5, 0.9, 0.7],
          },
          pl: 6,
          pr: 6,
          pt: 2,
          pb: 2,
          fontFamily: "Roboto",
          fontWeight: "700",
          letterSpacing: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => JoinTwoPlayerGame()}
      >
        {text}
      </Button>
    )
}
export const AuthButton=({handleSave, text})=>{
  return(
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
    onClick={() => handleSave()}
  >
    {text}
  </Button>
  )
}