import axios from "axios";
import React, { useCallback, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/store";
import AllNotes from "./AllNotes";
import NotesInput from "./NotesInput";
import styles from "./navbar.module.css"
import NotesInputEdit from "./NotesInputEdit";
import API_URL from "../api";
function NotesPage() {
    const userData:any=useSelector<any>((state)=>state.userReducer.userDetails)
      const editNote:any=useSelector<any>((state)=>state.userReducer.noteToEdit)
       const [showAccount,setShowAccount]=useState(false)
      const [isAuthenticated,setIsAuthenticated]=useState<any>(false)
   console.log("editNote",editNote);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const refreshtoken = API_URL.refreshToken;

   useEffect(() => {
   async function authorize(){
    setIsAuthenticated(false)
    const token = localStorage.getItem("token");
    if(!token){
      navigate("login")
    }
    console.log("token---",token)
    await axios
      .get(refreshtoken, {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: "include",
        },
      })
      .then((res) => {
        console.log("refresh", res);
        localStorage.setItem("userID",JSON.stringify(res.data.id))
        dispatch(userActions.setUser(res.data))
        setIsAuthenticated(true)
      })
      .catch((err) => {
        console.log("authorizeErr",err)
        navigate("login")
      });
    }
    authorize();
  }, []);
 



  function handleLogout(){
     localStorage.removeItem("token");
     localStorage.removeItem("userID");
     dispatch(userActions.setIsloggedIn(false))
     navigate("login")
  }
  function handleEditClose(){
    if( editNote!=null)
    dispatch(userActions.setNotetoEdit(null))
   //setShowAccount(false)
  }
 function toggleShowAccount(){
  setShowAccount((prev)=>!prev)
 }
  return <div className={`${styles.fulllHieght} ${editNote!=null?styles.backgroundDark:""}`}>
    {isAuthenticated&&
    <div >
    <div onClick={handleEditClose}>
   <NavBar setShowAccount={toggleShowAccount} showAccount={showAccount} handleLogout={handleLogout}/>
   <NotesInput/>
   <AllNotes/>
    </div>
    {
      editNote!=null&&<NotesInputEdit />
    }
    </div>
  }
  </div>;
}

export default NotesPage;
