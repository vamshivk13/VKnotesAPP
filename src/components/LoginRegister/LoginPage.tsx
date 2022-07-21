import React ,{useEffect, useState} from 'react'
import styles from "./login.module.css"
import axios from 'axios'
import {useSelector, useDispatch}  from 'react-redux'
import { userActions } from '../../store/store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import API_URL from '../api';
function LoginPage() {
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const url=API_URL.auth
  const navigate=useNavigate();
  const userDetails=useSelector<any>((state)=>state.userReducer.userDetails)
   const isLoggedIn=useSelector<any>((state)=>state.userReducer.isLoggedIn)
  const dispatch=useDispatch<any>();
  function handleEmailInput(e:any){
   setEmail(e.target.value);
  }
  function handlePasswordInput(e:any){
   setPassword(e.target.value);
  }
  async function handleLogin(){
   console.log(email,password)
   const loginObj={url,userData:{
    email,password
   }}
   dispatch(userActions.authAddUser(loginObj))
  
  }

  useEffect(()=>{
   if(isLoggedIn)
   {
    navigate("/")
   }
  },[isLoggedIn])
 
  
  return (
    <div className={styles.topContainer}>
    <div className={styles.loginForm}>
      <div className={styles.inputElements}>
      <input  className={styles.textInput} type="text" placeholder='email' onChange={handleEmailInput}></input>
       <input className={styles.textInput} type="password" placeholder='password' onChange={handlePasswordInput}></input> 
       </div>
       <button className={styles.submitButton}  type="button" onClick={handleLogin}>Login</button>
      <div className={styles.link}>
      <Link to="/register">
        New User? sign Up !
       </Link>
       </div>
    </div>
    </div>
  )
}

export default LoginPage