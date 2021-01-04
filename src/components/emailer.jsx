import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { useToasts } from 'react-toast-notifications'
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';



init("user_Z6G9K8R9wnCH3eBzDvvrP");

const FormWithToasts = () => {
    const { addToast } = useToasts();
    const [isPhoneNo, setIsPhone] = useState(true);
    const [errorText, setErrorText] = useState('');
  

    const onChange = (event) => {
        if ((event.target.value.match(/^-?[0-9]\d*\.?\d*$/) && event.target.value.length === 10) || event.target.value === '' ) {
            setErrorText('');
            setIsPhone(true);
        } else {
            setErrorText('Please provide a valid number');
            setIsPhone(false);
        }
        // console.log("isPhoneNo = " + this.isPhoneNo);
        // console.log("length = " + event.target.value.length);
        return isPhoneNo;
      }

    const emailFunc = async e => {  
        e.preventDefault();

        if(isPhoneNo){
            emailjs.sendForm('gmail_div_cateron', 'template_neglsul', e.target, 'user_Z6G9K8R9wnCH3eBzDvvrP')
              .then((result) => {
                  console.log(result.text);
                  
                    addToast('Your email is sent successfully. We\'ll get back to you soon as possible. ', { 
                        appearance: 'success', 
                        autoDismiss: true,
                        PlacementType: 'bottom-right'
                        
                    })
              }, (error) => {
                  console.log(error.text);
                  
                    addToast('Something went wrong, please try again or call us instead', { 
                        appearance: 'error', 
                        autoDismiss: true,
                        PlacementType: 'bottom-right'                        
                    })
              }, (response) => {
            });
            e.target.reset();
        }else{
            addToast('Something went wrong, please ensure that all fields are filled properly and try again.', { 
                appearance: 'error', 
                autoDismiss: true,
                PlacementType: 'bottom-right'
                
            })
        }
    }
    
    const resetFunc = async e => {    
        e.preventDefault();
        document.getElementById('mail_func').reset();
        setErrorText('');
        setIsPhone(false);
    }
  
    // return <Button variant="outlined" color="primary" className="cr-btn" onClick={showSuccess}>Send</Button>

    return (<form action="mail_func" id="mail_func" onSubmit={emailFunc}>
              <div className="container-fluid mb-2">
                
                  <div className="row">
                    <div className="col-md-4 py-3">
                      <TextField className="cr-input w-100" id="name" name="from_name" label="Name" required/>
                    </div>
                    <div className="col-md-4 py-3">
                      <TextField className="cr-input w-100" id="email" name="email" label="Email" type="email" required/>
                    </div>
                    <div className="col-md-4 py-3">
                      <FormControl className="cr-input w-100" error={!isPhoneNo}>
                        <InputLabel htmlFor="component-simple">Telephone</InputLabel>
                        <Input id="telephone" inputMode='numeric' pattern="[0-9]*" name="phone_no" inputProps={{ maxLength: 10}} required  onChange={onChange} />
                        <FormHelperText>
                          {errorText}
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-12 py-3">
                      <TextField className="cr-input w-100" multiline rows={4} rowsMax={4} name="message" id="body" label="What's on your mind?" required/>
                    </div>
                  </div>
                  <div className="text-right mt-2 mt-md-4">
                    <Button variant="text" color="primary" className="cr-btn mr-3" onClick={resetFunc}>Reset</Button>
                    <Button variant="outlined" color="primary" type='submit' className="cr-btn" >Send</Button>
                  </div>
              </div>
            </form>)
  }
  
export default FormWithToasts;