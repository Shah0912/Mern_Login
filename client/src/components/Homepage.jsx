import { useRef, useEffect } from 'react';
import img1 from '../img/img1.png';
// import logo from './img/logo.png';
import {TweenMax} from 'gsap';
import { AccountBox } from "./accountBox";

function HomePage() {
    let imgs = useRef(null);
    let form = useRef(null);
    
    useEffect(()=>{
      TweenMax.to(imgs, 1, {delay: 0.1, opacity: 1 , ease: 'easeOut'})
      TweenMax.to(form, 2, {delay: 0.1, opacity: 1, ease: 'easeOut'})
    })
    return (
      <div className="wrapper">
          <div className="separate" id="start">
             <div className="banner" ref={el => imgs = el}>
                <img src={img1} alt="main-img" />
             </div>
          </div>
          <div className="separate" id="form-section">
          <div className="form-style" ref = {el => form = el}>
                <AccountBox />
             </div>
          </div>
      </div>
    );
}

export default HomePage;