import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomTheme from '../theme'

const GameTypography = ({title}) => {
  return (
    <Typography
    sx={{
      color: "text.secondary",
      fontFamily: "Roboto",
      fontWeight: 900,
      fontSize: 30,
      mt: CustomTheme.spacing(3),
      ml: "auto",
      mr: "auto",
      textAlign: "center",
      letterSpacing: 6,
      animation: "glowing 2s infinite",
      "@keyframes glowing": {
        "0%, 100%": {
          color: "rgba(255, 0, 0, 0.7)",
        },
        "50%": {
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
    }}
  >
    {title}
  </Typography>
  )
}
const HomeTypography = ({title}) => {
    return (
      <Typography
      sx={{
        color: "text.secondary",
        fontFamily: "Roboto",
        fontWeight: 900,
        fontSize: 60,
        mt: CustomTheme.spacing(10),
        ml: "auto",
        mr: "auto",
        textAlign: "center",
        letterSpacing: 6,
        animation: "glowing 2s infinite",
        "@keyframes glowing": {
          "0%, 100%": {
            textShadow: "0 0 10px rgba(255, 0, 0, 0.7)",
          },
          "50%": {
            textShadow: "0 0 20px rgba(255, 0, 0, 0.9)",
          },
        },
      }}
    >
      {title}
    </Typography>
    )
  }
  const MotionTypography = ({text}) => {
    const [visibleText, setVisibleText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (currentIndex < text.length) {
          const interval = setInterval(() => {
            setVisibleText((prevText) => prevText + text[currentIndex]);
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }, 100);
    
          return () => clearInterval(interval);
        }
      }, [currentIndex]);
  return (
    <Typography
    sx={{
      color: "text.secondary",
      fontFamily: "Nunito",
      fontWeight: 900,
      fontSize: 28,
      textShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
      mt: CustomTheme.spacing(10),
      ml: "auto",
      mr: "auto",
      textAlign: "center",
      letterSpacing: 6,
    }}
  >
    {visibleText}
  </Typography>
  )
}
const WhiteTypography = ({text})=>{
    return(
        <Typography
        sx={{
          color: "text.primary",
          fontFamily: "Nunito",
          fontWeight: 900,
          fontSize: 14,
          textShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
          mt: CustomTheme.spacing(2),
          ml: "auto",
          mr: "auto",
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        {text}
      </Typography>
    )
}
const AuthDescriptionTypography = ({title, text})=>{
  return(
    <>
     <Typography
            variant="h5"
            align="center"
            paddingTop={4}
            fontFamily="Roboto"
            fontWeight="700"
          >
            {title}
          </Typography>
          <Typography
            paragraph
            align="center"
            fontFamily="Roboto"
            fontWeight="500"
          >
            {text}
          </Typography>
    </>
  )
}
export {GameTypography, HomeTypography, MotionTypography, WhiteTypography, AuthDescriptionTypography}