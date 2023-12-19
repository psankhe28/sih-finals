import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layout'
import logo from '../assets/img/logo.svg'

const Footer = () => {
   return (
      <FooterStyled>
         <InnerLayout>
            <div className="footer-con">
               <div className="logo-con">
                  <div className="logo-wrap">
                     <img src={logo} alt="" />
                     <p>
                        Copyright @2023 LoremIpsum <br />
                        All rights reserved
                     </p>
                  </div>
               </div>

            </div>
         </InnerLayout>
      </FooterStyled>
   )
}
const FooterStyled = styled.footer`
   padding: 0 18rem;
   background-color: #dce2f0;

   @media screen and (max-width: 1347px){
      padding: 5rem 14rem;
   }
   @media screen and (max-width: 1186px){
      padding: 5rem 8rem;
   }
   @media screen and (max-width: 990px){
      padding: 5rem 4rem;
   }

   .footer-con{
      display: grid;
      grid-template-columns: repeat(2 , 1fr);
      .logo-con{
         display: flex;
         align-items: center;
         img{
            width: 90px;
         }
      }

      @media screen and (max-width: 480px){
         grid-template-columns: repeat(1 , 1fr);
         .logo-wrap{
            margin: 0 auto;
            p{ display: none}
         }
      }
   }
   .bottom-nav{
      display: flex;
      justify-content: space-between;

      li{
         padding: 2rem 0;
         color: #16194f;
      }
   }
`

export default Footer
