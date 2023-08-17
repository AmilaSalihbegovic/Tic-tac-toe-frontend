import { Box } from '@mui/material'
import React from 'react'
import CustomTheme from '../theme'
import { WhiteTypography } from './GameTypography'

const GameHistory = ({status, historyMove}) => {
  return (
    <Box
    sx={{
      width: "100%",
      maxWidth: 300,
      height: "100%",
      maxHeight: 500,
      position: "relative",
      mt: CustomTheme.spacing(13.6),
      ml: "auto",
      mr: CustomTheme.spacing(13.6),
      borderRadius: 2,
      boxShadow: "0px 3px 6px rgba(255, 255, 255, 0.16)",
      backgroundColor: "primary.dark",
    }}
  >
    <WhiteTypography text={"Game history:"}></WhiteTypography>
    <WhiteTypography text={`Status: ${status}`} />
    <WhiteTypography text={`${historyMove}`} />
  </Box>
  )
}

export default GameHistory