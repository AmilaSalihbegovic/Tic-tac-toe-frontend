import { createTheme } from "@mui/material";
import { typography } from "material-ui/styles";

const CustomTheme = createTheme({
    palette:{
        mode: "dark",
        primary:{
            main: `#1B1B1B`,
            light: `#afb1b3`,
            dark: `#030304`,
        },
        background: {default:`#090E11`},
        text: {
            primary: `#676768`,
            secondary: `#700000`
        }
    },
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Nunito"'
        ].join(','),
      }
})

export default CustomTheme