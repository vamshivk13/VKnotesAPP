import React from 'react'
import styles from "./navbar.module.css"



function NavBar({handleLogout}:any) {

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
     <ul className={styles.allCategories}>
        <li onClick={handlePinnedNotes}>PinnedNotes</li>
        <li onClick={handleImportantNotes}>ImportantNotes</li>
         <li onClick={handleLogout}>logout</li>

     </ul>
    </div>
  )
}

export default NavBar