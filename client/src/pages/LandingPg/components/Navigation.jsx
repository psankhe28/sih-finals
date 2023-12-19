import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll'
import logo from '../assets/img/logo.png'

const Navigation = () => {
   return (
      <>
         <NavigationStyled>
            <div className="logo mt-2 mb-2">
               <img src={logo} alt="" style={{height:'72px'}} />
            </div>
            <div className="buttons">
               <RegisterButton>Register</RegisterButton>
               <LoginButton>Login</LoginButton>
            </div>
         </NavigationStyled>
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
      align-items: center;
      gap: 40px;
      margin-right: 20px;
      list-style-type: none;
      
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
      color: #333;
   }
`

const RegisterButton = styled.button`
   /* Add styles for Register button */
   padding: 10px 20px;
   border: none;
   background-color: #272b41;
   color: white;
   border-radius: 5px;
   cursor: pointer;
   margin-right: 10px;

   &:hover {
      background-color: #535c8c;
   }
`

const LoginButton = styled.button`
   /* Add styles for Login button */
   padding: 10px 20px;
   border: none;
   background-color: #272b41;
   color: white;
   border-radius: 5px;
   cursor: pointer;

   &:hover {
      background-color: #535c8c;
   }
`

export default Navigation
