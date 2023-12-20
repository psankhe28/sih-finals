import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../styles/Layout'
import lines from '../assets/img/lines.svg'
import questions from '../questions'
import Questions from '../components/Questions'

const FAQSection = () => {
   return (
      <FaqStyled id='faq'>
         <InnerLayout>
            <div  data-aos='fade-right'>
               <h3 className="small-heading">Frequently <span>asked questions</span></h3>
            </div>
            {/* <div className="lines">
               <img src={lines} alt="" />
            </div> */}
            <div className="questions-con" >
               {
                  questions.map(q => (
                     <Questions  key={q.id} {...q} />
                  ))
               }
            </div>
         </InnerLayout>
      </FaqStyled>
   )
}
const FaqStyled = styled.section`
   .c-para{
      width: 60%;
      margin: 0 auto;
   }
   .lines{
      position: absolute;
      left: 0;
      top: 360%;
      width: 100%;
      z-index: -1;

      img{
         width: 100%;
      }
   }
   .questions-con{
      padding-top: 2rem;
   }

`

export default FAQSection
