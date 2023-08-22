import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const AlertMessage = ({type, message}) => {
  return (
    <div>
         {type === "error" && (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    )}
    {type === "success" && (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    )}
  </div>
  )
}

export default AlertMessage