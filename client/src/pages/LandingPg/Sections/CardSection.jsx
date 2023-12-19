import React from 'react'
import styled, { keyframes } from 'styled-components'
import { InnerLayout } from '../styles/Layout'
import card from '../assets/img/creditcard.svg'
import { fadeInLeft } from 'react-animations'

const CardSection = () => {
   return (
      <CardSectionStyled id='card'>
         <InnerLayout >
            <div className="card-container">
               <div className="card-left">
                  <h2 data-aos='fade-right' data-aos-duration='3000' className="secondary-heading" >
                     One card for all your verified documents
                  </h2>
                  <p>
                     Unlocking Possibilities, One Click at a Time - Explore, Connect, and Thrive with Us
                  </p>
               </div>
               <div className="card-right">
                  <img src={card} alt="" />
               </div>
            </div>
         </InnerLayout>
      </CardSectionStyled>
   )
}
// const FadeInLeft = styled.h1`
//    animation: 2s ${keyframes`${fadeInLeft}`};
// `

const CardSectionStyled = styled.section`
   .card-container{
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      @media screen and (max-width: 845px){
         grid-template-columns: repeat(1, 1fr);
      }

      .card-right{
         display: flex;
         justify-content: flex-end;
      }
      .card-left{

         p{
            padding: 1rem 0;
         }
      }
   }
`

export default CardSection
