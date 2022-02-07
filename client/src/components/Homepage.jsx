import { useRef, useEffect, useState } from 'react';
import img1 from '../img/img1.png';
// import logo from './img/logo.png';
import {TweenMax} from 'gsap';
import { AccountBox } from "./accountBox";
import styled from 'styled-components';
import { motion } from "framer-motion";
import {LoginContext} from './accountBox/accountContext';

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(0);
  top: -290px;
  left: -70px;
  background: rgba(214, 162, 232,1.0);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  margin:auto;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const backdropVariants = {
   expanded: {
     width: "100vw",
     height: "100vh",
     transform: "rotate(0deg)",
     zIndex: 10,
     top: 0,
     left: 0,
     borderRadius: 0
   },
   collapsed: {
     width: "0px",
     height: "0px",
     borderRadius: "50%",
     transform: "rotate(-60deg)",
     zIndex: 10
   },
 };
 
 const expandingTransition = {
   type: "spring",
   duration: 1,
   stiffness: 20,
 };

function HomePage() {

   const [isExpanded, setExpanded] = useState(false);
   const [name,setName] = useState('');

   const LoginBanner = () => {
   setExpanded(true)
   };

    let imgs = useRef(null);
    let form = useRef(null);
    
    useEffect(()=>{
      TweenMax.to(imgs, 1, {opacity: 1 , ease: 'easeOut'})
      TweenMax.to(form, 2, {opacity: 1, ease: 'easeOut'})
    })
    return (
      <div className="wrapper">
         <BackDrop initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}>
         <HeaderContainer>
              <HeaderText>{`Welcome ${name}!`}</HeaderText>
              <HeaderText>{`You have Logged in Successfully`}</HeaderText>
            </HeaderContainer>
         </BackDrop>
          <div className="separate" id="start">
             <div className="banner" ref={el => imgs = el}>
                <img src={img1} alt="main-img" />
             </div>
          </div>
          <div className="separate" id="form-section">
          <div className="form-style" ref = {el => form = el}>
             <LoginContext.Provider value = {{setName,LoginBanner}}>
                <AccountBox />
            </LoginContext.Provider>
             </div>
          </div>
      </div>
    );
}

export default HomePage;