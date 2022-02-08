import React, { useState, useContext } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "../accountBox/common";
import { Marginer } from "../marginer";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {ResetContext} from '../accountBox/accountContext';

export function ResetPasswordForm({token}) {

  const {resetPasswordSuccess} = useContext(ResetContext);

  const submit = (e) => {
    e.preventDefault()
    axios.put('/api/users/reset-password',values)
    .then((res) => {
      resetPasswordSuccess()
    }).catch((err) => {
      let errors = err.response.data
      for (var key in errors) {
        notify(errors[key])
      }
    })
  }
  
  const notify = (data) => toast.error(data);

  const [values,setValues] = useState({
    newPass:'',
    resetLink:token
  })

  const handleInputChange = e => {
        const {name,value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="password" placeholder="New Password" name='newPass' value={values.newPass} onChange={handleInputChange}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton style={{marginTop:'20px'}} type="submit" onClick={submit}>Submit</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <Toaster position="top-center" toastOptions={{duration:4000}}/>
    </BoxContainer>
  );
}
