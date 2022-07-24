import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import styles from "./navbar.module.css"



function NavBar({handleLogout,showAccount,setShowAccount}:any) {
  
   const userDetails=useSelector((state:any)=>state.userReducer.userDetails)
 function handleMyNotes(){
    console.log("handleMyNotes")
 }
function handlePinnedNotes(){

}
function handleImportantNotes(){

}
  return (
    <div className={styles.topContainer}>
    <div>Notes</div>
     <div className={styles.allCategories}>
     <div className={styles.dropDownButton} onClick={setShowAccount}>Account</div>
      {showAccount&&
      <div className={styles.dropdownMenu}>
      <ul> 
        <li>{userDetails.name}</li>
        <li>{userDetails.email}</li>
        <li onClick={handleLogout}>logout</li>
      </ul>
      </div>
     }
     </div>
    </div>
  )
}

export default NavBar