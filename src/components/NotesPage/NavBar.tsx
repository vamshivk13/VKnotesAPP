import React,{useState,useRef, useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import styles from "./navbar.module.css"
import style from "./searchBar.module.css"
import SideBar from '../SideBar/SideBar'
import { userActions } from '../../store/store'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function NavBar({handleLogout,showAccount,setShowAccount}:any) {
    const [sidebarActive,setisSidebarActive]=useState<boolean>(false)
    const [isSearchBarOpen,setisSearchBarOpen]=useState<boolean>(false)
    const [searchText,setSearchText]=useState<string>("")
   const userDetails=useSelector((state:any)=>state.userReducer.userDetails)
   const dispatch=useDispatch();
 function handleMyNotes(){
    console.log("handleMyNotes")
 }
function handlePinnedNotes(){

}
function handleImportantNotes(){

}
function handleSearchText(e:any){
  const searchtext=e.target.value;
  dispatch(userActions.setSearchMatchNotes(searchtext));
   setSearchText(searchtext)
}
function handleOutOfFocus(){
   if(searchText==""){
    setSearchText("")
    dispatch(userActions.setSearchMatchNotes(""))
    dispatch(userActions.setCurrentMode("All Notes"))
    setisSearchBarOpen((prev)=>!prev)
  }
}
function setSearchBarOpen(){
  if(!isSearchBarOpen){
    dispatch(userActions.setCurrentMode("Search"))
  }
  else
  {
    if(searchText==""){
    setSearchText("")
    dispatch(userActions.setSearchMatchNotes(""))
    dispatch(userActions.setCurrentMode("All Notes"))
    }
  }
  setisSearchBarOpen((prev)=>!prev)
}
function openSideBAr(){
  setisSidebarActive((prev)=>!prev)
  dispatch(userActions.toggleSidebarActive())
}

  return (
    <> 
    <div className={styles.topContainer}>
    <div className={styles.notesDiv}>
    <div onClick={openSideBAr}>{!sidebarActive? <MenuIcon/>:<MenuBookIcon/>}</div>
    <div>Notes</div>
    </div>
    <div className={style.searchBar}>
    <div className={`${style.searchIconBar} ${isSearchBarOpen&&style.isActive}` }>
    {isSearchBarOpen&&<input value={searchText} onChange={handleSearchText} autoFocus={true} onBlur={handleOutOfFocus} type="text"></input>}
     <IconButton onClick={setSearchBarOpen}>
    <SearchIcon style={{height:20}}/>
    </IconButton>
    </div>
    </div>
     <div className={styles.allCategories}>
     <div className={styles.dropDownButton} onClick={setShowAccount}><Avatar></Avatar></div>
      {
      <div className={`${styles.dropdownMenu} ${showAccount&&styles.active}`}>
      <ul> 
        <li>{userDetails.name}</li>
        <li>{userDetails.email}</li>
        <li onClick={handleLogout}>logout</li>
      </ul>
      </div>
     }
     </div>
    </div>
    </>
  )
}

export default NavBar