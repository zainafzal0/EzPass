import "./Register.css";
import React, { useState } from "react";
import logo from "../Assets/EzPass-Logo-trans.png";
import Axios from "axios";
import { useHistory } from 'react-router-dom';

function Register() {
  const [nameReg, setNameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [register, setRegister] = useState("");
  const history = useHistory();

  const registerUser = () => {
     
      Axios.post("http://localhost:3001/register", {
        name: nameReg,
        username: usernameReg,
        password: passwordReg, 
      }).then((response) => {
        console.log(response);
        if(response.data.message){
            console.log("wrong")
            setRegister(response.data.message);
        }else{
            history.push("/login");
        }
      }); 
      
  };
  return (
    <div className="Register">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <img id="registerLogo" src={logo} alt="" />
          <form>
          {register==="Username Already Exists!" && <h6>Username not Available</h6>}
            <input
              type="text"
              id="login"
              class="fadeIn first"
              name="name"
              placeholder="Name"
              onChange={(e) => {
                setNameReg(e.target.value);
              }}
            />
            <input
              type="text"
              id="login"
              class="fadeIn second"
              name="username"
              placeholder="Username"
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
            <input
              type="password"
              id="login-password"
              class="fadeIn third"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
            
            <input onClick={registerUser} type="button" class="fadeIn fourth" value="Register" />
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Register;
