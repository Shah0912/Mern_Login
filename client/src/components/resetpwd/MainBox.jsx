import styled from 'styled-components'
import { motion } from "framer-motion";
import {useState} from 'react'
import { ResetPasswordForm } from './resetPasswordForm';
import {ResetContext} from '../accountBox/accountContext';

const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(214,162,232);
  background: linear-gradient(58deg, rgba(214,162,232,1) 20%, rgba(130,88,159,1) 100%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export default function MainBox({token}) {
    const [isExpanded, setExpanded] = useState(false);


    const resetPasswordSuccess = () => {
      setExpanded(true);
      setTimeout(() => {
        window.location.replace("https://loginsystem5862.herokuapp.com/")
        }, 4000);
    }

    const contextValue = {resetPasswordSuccess};

    return (
      <ResetContext.Provider value={contextValue}>
        <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          
            {!isExpanded && (<HeaderContainer>
              <HeaderText>Reset</HeaderText>
              <HeaderText>  Password</HeaderText>
              <SmallText>Enter new password to continue!</SmallText>
            </HeaderContainer>)}

            {isExpanded && (
            <HeaderContainer>
              <HeaderText>Password Reset</HeaderText>
              <HeaderText>Successfully!</HeaderText>
              <SmallText>You are being redirected for login</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
            <ResetPasswordForm token={token}/>
        </InnerContainer>
      </BoxContainer>
      </ResetContext.Provider>
    )
}