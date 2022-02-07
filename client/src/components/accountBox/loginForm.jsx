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
import { AccountContext } from "./accountContext";
import axios from 'axios';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const submit = (e) => {
    e.preventDefault();
    axios.post('/api/users/login',values)
    .then((res) => {
      console.log(res);
    }).catch((err) => console.log(err))
  }

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
      <MutedLink href="#">Forgot your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={submit}>Login</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          SignUp
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
