import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
    palette: {
      type: 'dark',

      primary: {
        light: "#03DAC6",
        main: "#03DAC6",
        dark: "#03DAC6",
        //main: purple[500],
        //dark: purple[700]
      },
      secondary: {
        light: "#424242",
        main: green[500],
        dark: green[700]
      },
      background: {
        default: "#303030"
      }
    }
  });
  
  function withRoot(Component) {
    function WithRoot(props) {
      // MuiThemeProvider makes the theme available down the React tree
      // thanks to React context.
      return (
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      );
    }
  
    return WithRoot;
  }
  
  export default withRoot;