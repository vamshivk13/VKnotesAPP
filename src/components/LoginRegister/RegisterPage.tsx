import React,{useState} from 'react'
import styles from "./login.module.css"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/store';
import {Link} from "react-router-dom"
import API_URL from '../api';
function RegisterPage() {
  const url=API_URL.registerUser
   const dispatch=useDispatch<any>();

  const [email,setEmail]=useState<string>("");
  const[name,setName]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [cnfDassword,setCnfPassword]=useState<string>("");
  function handleEmailInput(e:any){
   setEmail(e.target.value);
  }
  function handlePasswordInput(e:any){
   setPassword(e.target.value);
  }
  function handleCnfPasswordInput(e:any){
   setCnfPassword(e.target.value);
  }
  function handleNameInput(e:any){
   setName(e.target.value);
  }
  async function handleRegister(){
    const payload={url:url,
      userData:{name:name,email:email,password:password}
    }
  dispatch(userActions.registerUser(payload))
  }
  return(
    <div className={styles.topContainer}>
    <div className={styles.loginForm}> 
    <div className={styles.inputElements}>
     <input className={styles.textInput} type="text" placeholder='name' onChange={handleNameInput}></input>
      <input className={styles.textInput} type="text" placeholder='email' onChange={handleEmailInput}></input>
       <input className={styles.textInput} type="password" placeholder='password' onChange={handlePasswordInput}></input> 
       <input className={styles.textInput} type="password" placeholder='confirm password' onChange={handleCnfPasswordInput}></input> 
       </div>
       <button className={styles.submitButton} type="button" onClick={handleRegister}>Register</button>
       <div className={styles.link}>
        <Link to="/login">
         Already a User? sign In !
       </Link>
       </div>
      </div>
    </div>)
  
}

export default RegisterPage