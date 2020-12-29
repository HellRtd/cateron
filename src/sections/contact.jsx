import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import { ToastProvider } from 'react-toast-notifications'
// import { withToastManager } from 'react-toast-notifications';
 
import FormWithToasts from '../components/emailer';



init("user_Z6G9K8R9wnCH3eBzDvvrP");


class Contact extends Component {

  isPhoneNo = false;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errorText: '',
      value: props.value,
      isInvalidNum: true
    };
  }

  onChange = (event) => {
    if ((event.target.value.match(/^-?[0-9]\d*\.?\d*$/) && event.target.value.length === 10) || event.target.value === '' ) {
      this.setState({errorText: ''});
      this.isPhoneNo = true;
    } else {
      this.setState({errorText: 'Please provide a valid number'})
      this.isPhoneNo = false;
    }
    // console.log("isPhoneNo = " + this.isPhoneNo);
    // console.log("length = " + event.target.value.length);
    return this.isPhoneNo;
  }
  sendEmail = (e) => {
    e.preventDefault();
    if(this.isPhoneNo){
      emailjs.sendForm('gmail_div_cateron', 'template_neglsul', e.target, 'user_Z6G9K8R9wnCH3eBzDvvrP')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        }, (response) => {
          // <FormWithToasts></FormWithToasts>
        });
        e.target.reset();
    }else{
      // return <FormWithToasts></FormWithToasts>
    }
  }
  // onlineCallback = () => {
  //   this.props.toastManager.remove(this.offlineToastId);
  //   this.offlineToastId = null;
  // };
  // offlineCallback = id => {
  //   this.offlineToastId = id;
  // }
  
  //  handleClickOpen = () => {
  //   this.setState({ open: true })
  //   console.log('opened...' + this.state.open)
  // };

  //  handleClose = () => {
  //    this.setState({ open: false })
  // };

  render() { 
    return ( 
      <section id="contact">
        <div className="container mb-5 pb-3 pt-4">
          <div className="cr-mail-container">
            <div className="cr-title-wrapper d-block px-3">
              <h1 className="cr-title cr-title--highlight font-weight-light">We’d love to hear from you!</h1>
              <h4 className="cr-title-tag">Send us a message, and we’ll get back to you soon as possible</h4>
            </div>
            <ToastProvider autoDismissTimeout={6000}>
              <FormWithToasts />
            </ToastProvider>
          </div>
        </div>
      </section>
    );
  }
}
 
export default Contact;

