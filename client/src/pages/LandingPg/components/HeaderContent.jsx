import React from 'react'
import styled from 'styled-components'
import SecondaryButton from './SecondaryButton'
import phone from '../assets/img/phone.svg'
import ring1 from '../assets/img/ring_orange.svg';
import message1 from '../assets/img/message_pink.svg';
import message2 from '../assets/img/message_blue.svg';
 
const HeaderContent = () => {
   return (
      <HeaderContentStyled>
         <div className="left-content">
            <div className="left-text-container">
               <h1 data-aos='zoom-in-right'>Institution Level Verification of inter-state students</h1>
               <p className="white">
                  NSP enables Institution Level Verification of the students from one state studying in different states.
               </p>
               <a href="/signup">
          <RegisterButton>Register Now!</RegisterButton>
        </a>
            </div>
         </div>
         <div className="right-content">
            <img src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYQA8rZ_wW0vTgiBgfVWoDdsxQpdPl_QkcbN_a1NyL1logBM_LYqsyroLhe98pcUUHBYeZOEExqlWZRw0aunPEh8g8MY9Q=s2560" alt=''/>
            {/* <img src={phone} alt="" className="phone" />
            <img src={ring1} alt="" className="ring1" />
            <img src={message1} alt="" className="message1" />
            <img src={message2} alt="" className="message2" /> */}
         </div>
      </HeaderContentStyled>
   )
}


// const Bounce=styled.h1`
//    animation: 3s ${keyframes`${bounce}`} infinite;
// `

const RegisterButton = styled.button`
   /* Add styles for Register button */
   padding: 20px 50px;
   border:  #ffffff 2px;
   background-color: #000000;
   color: white;
   border-radius: 5px;
   cursor: pointer;
   margin-right: 10px;
   font-size: 18px;

   &:hover {
      background-color: #535c8c;
   }
`
const HeaderContentStyled = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   padding-top: 1rem;

   @media screen and (max-width: 700px){
        grid-template-columns: repeat(1, 1fr);
   }

   .left-content{
      display: flex;
      align-items: center;
      padding-right: 3rem;
      @media screen and (max-width: 480px){
         width: 100%;
      }

      h1{
         font-size: 3rem;
         font-weight: 600;
         @media screen and (max-width: 700px){
            font-size: 3rem;
         }
      }
      .white{
      color: #fff;
      line-height: 1.8rem;
      }
   }
   .right-content{
      position: relative;
      display: flex;
      justify-content: center;
      

      .phone{
         width: 80%;
      }
      .ring1{
            position: absolute;
            bottom: 10%;
            right: 0;
            left: auto;
            animation: move2 20s infinite;
            transition: all .4s ease-in-out;
      }
      .message1{
         position: absolute;
         top: 0;
         right: 0;
         left: auto;
         animation: move 5s infinite;
         transition: all .4s ease-in-out;
      }
      .message2{
         position: absolute;
         bottom: 15%;
         left: 0;
         transition: all .4s ease-in-out;
         animation: move 8s infinite;
         animation-delay: .5s;
         transition: all .4s ease-in-out;
         
      }
   }

    //Header Animations
    .message1{
        @keyframes move{
            0%{
                transform: translateY(0) rotate(0) scale(1) translateX(0);
            }
            50%{
                transform: translateY(-10px) rotate(20deg) scale(1.1) translateX(10px);
            }
            100%{
                transform: translateY(0)  rotate(0deg) scale(1) translateX(0);
            }
        }
        @keyframes move2{
            0%{
                transform: translateY(0) rotate(0) scale(1) translateX(0);
            }
            50%{
                transform: translateY(-10px) rotate(60deg) scale(1.1) translateX(10px);
            }
            100%{
                transform: translateY(0)  rotate(0deg) scale(1) translateX(0);
            }
        }
    }
   
`

export default HeaderContent
