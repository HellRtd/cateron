import React, { Component } from 'react';
import {Link} from "react-scroll";
import { Controller, Scene } from 'react-scrollmagic';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
  state = {  }
  render() { 
    return ( 
      <React.Fragment>
        <Controller>
          <Scene offset={10} classToggle="active" triggerElement="#serv" triggerHook="onLeave" reverse={true} indicators={false}>
            <nav className="cr-navbar">
              <span className="cr-navbar-logo">Cateron.</span>
              <div className="cr-navbar-action">
                <a href="tel:0719058004" className="btn btn-theme">GET IN TOUCH</a>
              </div>
            </nav>
          </Scene>
        </Controller>
        <header id="the_top" className="p-4 mb-4 cr-header">
          <Controller>
            <Scene duration={200} classToggle="active" triggerElement="#the_top" triggerHook="onLeave" reverse={true} indicators={false}>
              <div className="cr-header__top">
                <a href="tel:0719058004" className="cr-header__contact-btn">
                <div className="cr-header__contact-btn-bg btn-pulse"></div>
                <div className="cr-header__contact-btn-text">
                  <div className="small font-weight-light">
                    GET IN
                  </div>
                  <div className="font-weight-bold"> Touch</div>
                </div>
                </a>
              </div>
            </Scene>
          </Controller>



          {/* <nav class="cr-header-btn-container">
            <input type="checkbox" href="#" class="cr-header-btn" name="cr-header-btn" id="cr_header_btn"/>
            <label class="cr-header-btn-label btn-pulse" for="cr_header_btn">
              <span class="hamburger hamburger-1"></span>
              <span class="hamburger hamburger-2"></span>
            </label>
            
            <div className="cr-header-btn-text">
              <div className="small font-weight-light">
                GET IN
              </div>
              <div className="font-weight-heavy"> Touch</div>
            </div>
          
            <a href="#adc" class="cr-header-btn-item call">
              <FontAwesomeIcon icon={['fas', 'phone-alt']}  size="lg" />

            </a>
            <a href="#adcs" class="cr-header-btn-item message">
              <FontAwesomeIcon icon={['fab', 'facebook-messenger']}  size="lg" />  
            </a>

          </nav> */}


          {/* <!-- filters --> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="shadowed-goo-2">
                    
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                    <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.9" result="shadow" />
                    <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                    <feBlend in2="shadow" in="goo" result="goo" />
                    <feBlend in2="goo" in="SourceGraphic" result="mix" />
                </filter>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in2="goo" in="SourceGraphic" result="mix" />
                </filter>
              </defs>
          </svg> */}


          <div className="cr-logo-container">
            {/* <div class="cr-logo-prefix text-uppercase theme">Welcome to the</div> */}
            <div className="cr-logo"><span className="fast-flicker">Cat</span>er<span className="flicker">on</span>.</div>
            <div className="cr-logo-postfix text-uppercase">Your memorable events begin with us</div>
          </div>

        </header> 
        <Controller>
            <Scene duration={50} classToggle="active" triggerElement="#the_top" triggerHook="onLeave" reverse={true} indicators={false}>
              <div className="cr-mouse-container">
                <Link className="cr-mouse cursor-pointer" 
                    to="serv"
                    spy={true}
                    smooth={true}
                    offset={-280}
                    duration={800}>
                      <div className="cr-mouse-scroller"></div>
                </Link>
              </div>
            </Scene>
          </Controller>
      </React.Fragment>
      
       );
  }
}
 
export default Header;