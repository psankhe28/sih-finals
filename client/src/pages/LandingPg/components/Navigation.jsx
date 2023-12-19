import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll'
import PrimaryButton from './PrimaryButton'
import logo from '../assets/img/logo.svg'
// import Slideshow from './Slideshow'

const Navigation = () => {
   return (
      <>
      <NavigationStyled>
         <div className="logo mt-5">
            <img src={logo} alt="" />
         </div>
         <ul className='mt-5'>
            <li>
               <StyledLink to="header" spy={true} smooth={true}>Home </StyledLink>
            </li>
            <li>
               <StyledLink to="features" spy={true} smooth={true}>Features </StyledLink>
            </li>
            <li>
               <StyledLink to="pricing" spy={true} smooth={true}>Pricing </StyledLink>
            </li>
         </ul>
         <PrimaryButton name='Signup' />
      </NavigationStyled>
      {/* <Slideshow/> */}
      </>
   )
}

const NavigationStyled = styled.nav`
   display: flex;
   justify-content: space-between;
   align-items: center;
   
   ul {
      display: flex;
      justify-content: space-between;
      width: 40%;
      
      li {
         cursor: pointer;
      }
   }
`

const StyledLink = styled(Link)`
   color: black;
   font-weight: bold;
   text-decoration: none;
   transition: color 0.3s ease;
   
   &:hover {
      color: #333; /* Change the color on hover if desired */
   }
`

export default Navigation
