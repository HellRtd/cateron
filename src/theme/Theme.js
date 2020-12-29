// import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";
// import { darkModeTriggered } from '../components/fab';





export const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ffffff',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#263238',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    // type: isdarkTheme ? 'dark' : 'light',
    type: 'light'
    
  },
  typography: {
    fontFamily : "Raleway",
    button:{
      fontSize: '1rem',
      fontWeight: '500',
      padding: '1rem',
      // minWidth: '140px'
    }
  }
});


export const  darkTheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#C06C84',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#263238',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    // type: isdarkTheme ? 'dark' : 'light',
    type: 'dark'
    
  },
  typography: {
    fontFamily : "Raleway",
    button:{
      fontSize: '1.2rem',
      padding: '0.9rem 1rem',
    }
  }
});



// export const Theme = (props) => {
//   const {children, darkMode} = props; 

//   const defaultTheme  = darkMode ? darkTheme : theme;

//   // return <ThemeProvider theme= {defaultTheme }>{children}</ThemeProvider>
// }

// export const withTheme = (Component)=> {
//   // console.log("THIS" = darkModeTriggered);
//   return (props) => {
//     const [darkMode, setDarkMode] = useState(false);

//     return(
//       <Theme darkMode= {darkMode}>
//         <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode}></Component>
//       </Theme>
//     );
//   }
// }


