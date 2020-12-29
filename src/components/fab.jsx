import React, { Component } from 'react';
import {Link} from "react-scroll";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import {isOutsideClicked} from "../helpers/OutsideAlerter";
// import { createMuiTheme } from "@material-ui/core/styles";
// import {withTheme} from "../theme/Theme";


class Fab extends Component {
    state = { 
        isHover : false,
        isDarkMode: false
    };
    
    componentDidMount() {
        if (typeof window !== "undefined") {
          window.onscroll = () => {
            let currentScrollPos = window.pageYOffset;
            let maxScroll = document.body.scrollHeight - window.innerHeight;
            // console.log(maxScroll)
            if (currentScrollPos > 0 && currentScrollPos < maxScroll) {
              this.setState({ isHover: false })
              // console.log(currentScrollPos)
            } else {
            //   this.setState({ isHover: true })
            }
          }
        }
        
        window.onclick = () => {
            if(isOutsideClicked){
                this.setState({ isHover: false })
            }
        }

        window.addEventListener("resize", this.resize.bind(this));

        this.resize();
        this.storeUserTheme();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.setState({hideNav: window.innerWidth <= 760});
    }    
    
   
    toggleHover = () => {
        // this.setState({isHover : !this.state.isHover});
        this.setState({isHover : true});
        return true;
        // console.log(this.state.isHover)
    }
    

    //DARKMODE
    storeUserTheme = () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
    
            if (document.documentElement.getAttribute("data-theme") === 'dark') {
                this.setState({isDarkMode : true});
            } else {
                this.setState({isDarkMode : false});
            }
        }    
    }
    toggleDarkMode = () =>{
        if (document.documentElement.getAttribute("data-theme") === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            this.setState({isDarkMode : true});
            // this.props.isEnabledDark(true);
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            this.setState({isDarkMode : false});
            // this.props.isEnabledDark(false);
        }
    }
    render() {
        return (
            <React.Fragment>

                <nav className={`cr-menu ${this.state.isHover ? 'active' : ''}`} onMouseEnter={this.toggleHover} id="fab_menu">
                            
                            {/* <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open" />
                            <label className="menu-open-button" for="menu-open">
                                <span className="hamburger hamburger-1"></span>
                                <span className="hamburger hamburger-2"></span>
                                <span className="hamburger hamburger-3"></span>
                            </label> */}
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 80 }}
                            overlay={<Tooltip id="button-tooltip-2">Back To Top</Tooltip>}
                            >
                            <Link className = "cr-menu-item" onClick={this.toggleHover}
                                    activeClass="active"
                                    to="the_top"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={800} >
                                <i className="cr-icon cr-upload active-icon"></i>
                                <i className="cr-icon cr-upload-f inactive-icon"><span className="path1"></span><span className="path2"></span><span
                                        className="path3"></span><span className="path4"></span><span className="path5"></span><span
                                        className="path6"></span><span className="path7"></span><span className="path8"></span><span
                                        className="path9"></span><span className="path10"></span><span className="path11"></span><span
                                        className="path12"></span></i>
                            </Link>
                        </OverlayTrigger>                        

                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 80 }}
                            overlay={<Tooltip id="button-tooltip-2">Toggle Dark Mode</Tooltip>}
                            >
                                {/* className={`cr-icon cr-light-f active-icon ${this.state.isHover ? 'enable' : ''}`} */}
                            <button className={`cr-menu-item ${this.state.isDarkMode ? 'enabled' : ''}`} onClick={this.toggleDarkMode} id="mode_trigger" title="Toggle Dark Mode">
                                <i className="cr-icon cr-light-f active-icon"><span className="path1"></span><span className="path2"></span><span
                                        className="path3"></span><span className="path4"></span><span className="path5"></span><span
                                        className="path6"></span><span className="path7"></span><span className="path8"></span><span
                                        className="path9"></span><span className="path10"></span><span className="path11"></span><span
                                        className="path12"></span></i>
                                <i className="cr-icon cr-night-f inactive-icon"><span className="path1"></span><span className="path2"></span><span
                                        className="path3"></span><span className="path4"></span><span className="path5"></span><span
                                        className="path6"></span><span className="path7"></span><span className="path8"></span><span
                                        className="path9"></span><span className="path10"></span><span className="path11"></span><span
                                        className="path12"></span>
                                </i>
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 80 }}
                            overlay={<Tooltip id="button-tooltip-2">Contact Us</Tooltip>}
                            >
                            <Link className = "cr-menu-item" onClick={this.toggleHover}
                                    activeClass="active"
                                    to="contact"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={800} >
                                <i className="cr-icon cr-mail active-icon"></i>
                                <i className="cr-icon cr-mail-f inactive-icon"><span className="path1"></span><span className="path2"></span><span
                                        className="path3"></span><span className="path4"></span><span className="path5"></span><span
                                        className="path6"></span><span className="path7"></span><span className="path8"></span><span
                                        className="path9"></span><span className="path10"></span><span className="path11"></span><span
                                        className="path12"></span>
                                </i>
                            </Link>
                        </OverlayTrigger>
                        {/* <OverlayTrigger
                            placement="left"
                            delay={{ show: 80 }}
                            overlay={<Tooltip id="button-tooltip-2">Our Work</Tooltip>}
                            >
                            <Link className = "cr-menu-item" onClick={this.toggleHover}
                                    activeClass="active"
                                    to="tes"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={800} >
                                <i className="cr-icon cr-like active-icon"></i>
                                <i className="cr-icon cr-like-f inactive-icon"><span className="path1"></span><span className="path2"></span><span
                                        className="path3"></span><span className="path4"></span><span className="path5"></span><span
                                        className="path6"></span><span className="path7"></span><span className="path8"></span><span
                                        className="path9"></span><span className="path10"></span><span className="path11"></span><span
                                        className="path12"></span>
                                </i>
                            </Link>
                        </OverlayTrigger> */}
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 80 }}
                            overlay={<Tooltip id="button-tooltip-2">Who We Are</Tooltip>}
                                >
                            <Link className = "cr-menu-item" onClick={this.toggleHover}
                                    activeClass="active"
                                    to="crew"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={800} >
                                <i className="cr-icon cr-group active-icon"></i>
                                <i className="cr-icon cr-group-f inactive-icon"><span className="path1"></span><span className="path2"></span><span
                                        className="path3"></span><span className="path4"></span><span className="path5"></span><span
                                        className="path6"></span><span className="path7"></span><span className="path8"></span><span
                                        className="path9"></span><span className="path10"></span><span className="path11"></span><span
                                        className="path12"></span>
                                </i>

                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 80 }}
                            overlay={<Tooltip id="button-tooltip-2">Our Services</Tooltip>}
                            >
                            <Link className = "cr-menu-item" onClick={this.toggleHover}
                                    activeClass="active"
                                    to="serv"
                                    spy={true}
                                    smooth={true}
                                    offset={-140}
                                    duration={800} >
                                <i className="cr-icon cr-love active-icon"></i>
                                <i className="cr-icon cr-love-f inactive-icon"><span className="path1"></span><span className="path2"></span><span
                                        className="path3"></span><span className="path4"></span><span className="path5"></span><span
                                        className="path6"></span><span className="path7"></span><span className="path8"></span><span
                                        className="path9"></span><span className="path10"></span><span className="path11"></span><span
                                        className="path12"></span>
                                </i>
                            </Link>
                        </OverlayTrigger>
                    </nav>
                 {/* filters  */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="shadowed-goo">
                                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7" result="goo" />
                                <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                                <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
                                    result="shadow" />
                                <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                                <feComposite in2="shadow" in="goo" result="goo" />
                                <feComposite in2="goo" in="SourceGraphic" result="mix" />
                            </filter>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                                <feComposite in2="goo" in="SourceGraphic" result="mix" />
                            </filter>
                        </defs>
                    </svg>  */}
            </React.Fragment>
        
        );
    }
}


export default Fab;