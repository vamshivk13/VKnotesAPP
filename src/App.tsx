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

function App() {
     const isLoggedIn=useSelector<any>((state)=>state.userReducer.isLoggedIn);
  

  return (
    <div>
     <Routes>
        <Route path="/" element={<NotesPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}></Route>    
     </Routes>
     
   
    </div>
  )
}

export default App
