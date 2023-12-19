import React from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import AddScheme from '../State/AddScheme/AddScheme'

const Homepage = ({ token }) => {
  let navigate = useNavigate()

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate('/')
  }

  return (
    <div>
      <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
      <h3>Welcome back, {token.user.user_metadata.level}</h3>
      <h3>Welcome back, {token.user.email}</h3>
      <h3>Welcome back, {token.user.phone}</h3>
      <button onClick={handleLogout}>Logout</button>
      <AddScheme/>
    </div>
  );
};

export default Homepage;
