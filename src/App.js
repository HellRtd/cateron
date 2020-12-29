// import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import Fab from './components/fab';
import Contact from './sections/contact';
import Crew from './sections/crew';
import FooterSec from './sections/footer';
import Header from './sections/header';
import Service from './sections/service';
// import Tes from './sections/tes';
import OutsideAlerter from "./helpers/OutsideAlerter";
import { ThemeProvider } from "@material-ui/styles";
import {theme, darkTheme} from "./theme/Theme";

class App extends Component {   
  state = { 
    theTheme : theme,
  };
  
  componentDidMount(){
    this.matThemeModeChecker()
  }

  matThemeModeChecker=(isDark)=>{
    console.log(isDark)
    if(isDark === true){
      return this.setState({theTheme: darkTheme});
    }else{
      return this.setState({theTheme: theme});
    }
  }
  
  render() {
    return (
      <React.Fragment>    
        {/* <Provider> */}
          <Header></Header>
          <Service></Service>
          <Crew></Crew>
          {/* <Tes></Tes> */}
          <ThemeProvider theme={this.state.theTheme}>
            <Contact></Contact>
          </ThemeProvider>
          <FooterSec></FooterSec>
          <OutsideAlerter>
            {/* <Fab isEnabledDark = {this.matThemeModeChecker}></Fab> */}
            <Fab></Fab>
          </OutsideAlerter>
        {/* </Provider> */}
      </React.Fragment>
    );
  }
}



export default App;
