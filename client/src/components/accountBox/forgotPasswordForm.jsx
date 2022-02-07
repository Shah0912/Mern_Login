import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function ForgotPasswordForm(props) {

  const { switchToSignin} = useContext(AccountContext);

  const submit = (e) => {
    e.preventDefault();
    console.log('Button Pressed')
  }

  const notify = (data) => toast.error(data);

  const [values,setValues] = useState({
    email:''
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
        <Input type="email" placeholder="Email" name='email' value={values.email} onChange={handleInputChange}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={submit}>Submit</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Remember your Password?
        <BoldLink href="#" onClick={switchToSignin}>
          Login
        </BoldLink>
      </MutedLink>
      <Toaster position="top-center" toastOptions={{duration:4000}}/>
    </BoxContainer>
  );
}
