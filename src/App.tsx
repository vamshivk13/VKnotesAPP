import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css"
import LoginPage from "./components/LoginRegister/LoginPage";
import RegisterPage from "./components/LoginRegister/RegisterPage";
import NotesPage from "./components/NotesPage/NotesPage"
import {Link,Routes,Route} from "react-router-dom"
import LoginRegisterForm from "./components/LoginRegister/LoginRegisterForm";
import NotifyMessage from "./components/Notify/NotifyMessage";
import { Box, CircularProgress ,LinearProgress} from "@mui/material";
import { Margin } from "@mui/icons-material";
import BouncingDotsLoader from "./components/Loading/BouncingDotsLoader"
function App() {
     const isLoggedIn=useSelector<any>((state)=>state.userReducer.isLoggedIn);
  console.log(import.meta.env.VITE_ENV)
   const userData:any=useSelector<any>((state)=>state.userReducer.userDetails)
  return (
   
    <div style={{position:"relative"}}>

      {userData.length==0&&  <> <LinearProgress/><div style={{textAlign:"center",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",flex:1}}>
   
      <BouncingDotsLoader/>
         Fetching Notes
      </div></>}
     <Routes>
        <Route path="/" element={<NotesPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}></Route>    
     </Routes>
   
    </div>
  )
}

export default App
