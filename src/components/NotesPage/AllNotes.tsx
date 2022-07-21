import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { userActions } from '../../store/store';
import styles from "./navbar.module.css"
import NoteItem from './NoteItem';
import API_URL from '../api';
function AllNotes() {
  const allNotes:any=useSelector<any>((state)=>state.userReducer.allNotes);
   // const user:any=useSelector<any>((state)=>state.userReducer.userDetails);
        const userDetails:any=useSelector<any>((state)=>state.userReducer.userDetails)
console.log(allNotes);
  const dispatch=useDispatch();
    const allNoteUrl = API_URL.getAllNotes
    useEffect(()=>{
     
    async function getAllNotes(){
      try{
      console.log("uiD",userDetails.id)
      const userID:any=localStorage.getItem("userID")
      console.log("storedUseriD",userID)
      const notes=await axios.post(allNoteUrl,{userId:JSON.parse(userID)})
      console.log("allNotesDetails",notes);
      dispatch(userActions.setInitialNotes(notes.data));
      }
      catch(err){
        alert("unable to fetch notes")
      }
    
    }
    getAllNotes();

   },[userDetails])
  return (
    <div>
      <div  className={styles.allNoteContainer}>
      {allNotes.map((item:any)=>{
        return <NoteItem key={item._id}  dataItem={item}/>
      
      })}
        </div>
    </div>
  )
}

export default AllNotes