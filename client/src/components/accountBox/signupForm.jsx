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

export function SignupForm(props) {

  const { switchToSignin } = useContext(AccountContext);

  const submit = (e) => {
    e.preventDefault();
    axios.post('/api/users/register',values)
    .then((res) => {
      console.log(res);
    }).catch((err) => console.log(err))
  }


  const [values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
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
        <Input type="text" placeholder="Full Name" name='name' value={values.name} onChange={handleInputChange}/>
        <Input type="email" placeholder="Email" name='email' value={values.email} onChange={handleInputChange}/>
        <Input type="password" placeholder="Password" name='password' value={values.password} onChange={handleInputChange}/>
        <Input type="password" placeholder="Confirm Password" name='password2' value={values.password2} onChange={handleInputChange} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={submit}>SignUp</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Login
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
