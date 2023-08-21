import { Box, Button } from '@mui/material'
import React from 'react'
import CustomTheme from '../theme'
import { WhiteTypography } from './GameTypography'
import { useNavigate } from 'react-router-dom'

const GameIDs = ({data}) => {
    console.log(data);
    const navigate = useNavigate();
    const handleClick=(id)=>{
        navigate(`/history/${id}`)
    }
    return (
        <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          height: "100%",
          maxHeight: 500,
          position: "relative",
          mt: CustomTheme.spacing(13.6),
          ml: "auto",
          mr: CustomTheme.spacing(13.6),
          borderRadius: 2,
          boxShadow: "0px 3px 6px rgba(255, 255, 255, 0.16)",
          backgroundColor: "primary.dark",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <WhiteTypography text={"Game ID's for game history:"}></WhiteTypography>
        <ul>
            {data.map((info) => (
                <li>
                GameID: <Button onClick={()=>handleClick(info._id)}>{info._id}</Button>
              </li>
            ))}
          </ul>
          
      </Box>
      )
}

export default GameIDs