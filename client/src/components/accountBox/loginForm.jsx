import React, { useState,useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext, LoginContext } from "./accountContext";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function LoginForm(props) {
  const { switchToSignup,switchToForgotPassword } = useContext(AccountContext);
  const {setName,LoginBanner} = useContext(LoginContext);

  const submit = (e) => {
    e.preventDefault();
    axios.post('/api/users/login',values)
    .then((res) => {
      setName(res.data.payload.name);
      LoginBanner()
    }).catch((err) => {
      let errors = err.response.data
      for (var key in errors) {
        notify(errors[key])
      }
    })
  }

  const notify = (data) => toast.error(data);

  const [values,setValues] = useState({
    email:'',
    password:''
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
        <Input type="password" placeholder="Password" name='password' value={values.password} onChange={handleInputChange}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" onClick={switchToForgotPassword}>Forgot your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={submit}>Login</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          SignUp
        </BoldLink>
      </MutedLink>
      <Toaster position="top-center" toastOptions={{duration:4000}}/>
    </BoxContainer>
  );
}
