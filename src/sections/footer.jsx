import React, { Component } from 'react';
import CallOutlined from '@material-ui/icons/CallOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import TwitterIcon from '@material-ui/icons/Twitter';
// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import InstagramIcon from '@material-ui/icons/Instagram';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class FooterSec extends Component {
  state = {  }

  render() { 
    return ( 
      <footer >
        <div className="cr-alert-toast">

        </div>
        <div className="py-3 py-md-4 cr-footer">
          <div className="container my-md-4">
            <div className="row">
            <div className="col-md-4 pt-4  pb-0 pb-md-4 d-grid align-items-center justify-content-center border-right"><h1 className="cr-footer-logo mb-0">Cateron</h1></div>
            <div className="col-md-4 py-4 py-md-4 d-grid align-items-center justify-content-center border-right">
              <div className="d-flex align-items-center my-3">
                <CallOutlined style={{ fontSize: 32 }} className="mr-3"/>
                <span className="base-font--x-large">071-905-8004</span>
              </div>
            <div className="d-flex align-items-center my-3">
              <MailOutlineIcon style={{ fontSize: 32 }} className="mr-3"/>
              <a target="_blank" href="mailto:we.cateron@gmail.com?subject=Customer%20Request%20&body=%0D%0A%0D%0APhone%20Number%3A%0D%0A%0D%0ACheers%2C%0D%0AAnonymous%20Customer" className="base-font--x-large text-white">we.cateron@gmail.com</a>
            </div> 
            <div className="d-flex align-items-center my-3">
                <LocationOnOutlinedIcon style={{ fontSize: 32 }} className="mr-3"/>
                <span className="base-font--x-large">We are at <strong>Colombo</strong></span>
            </div>
            </div>
            <div className="col-md-4 py-4 d-flex flex-column align-items-center justify-content-center">
              <h3 className="cr-letter-spacing text-uppercase mb-4 font-weight-bold">Keep in touch</h3>
              <div className="social">
                <a href="#dummy" className="social__f">
                  <FontAwesomeIcon icon={['fab', 'facebook-f']}  size="lg" />
                </a>
                <a href="#dummy" className="social__fm">                 
                 <FontAwesomeIcon icon={['fab', 'facebook-messenger']}  size="lg" />
                </a>
                <a href="#dummy" className="social__i">
                 <FontAwesomeIcon icon={['fab', 'instagram']}  size="lg" />
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="py-1 px-3 d-sm-flex justify-content-sm-between align-items-sm-center text-center">
          <div className="cr-footer-footnote user-select-none base-font">cateron.lk © 2020</div>
          <div className="cr-footer-footnote text-uppercase base-font--small"><span className="user-select-none">Designed & Developed By</span><strong> Heshan Rajapaksha</strong></div> 
        </div>
      </footer>
       );
  }
}
 
export default FooterSec;