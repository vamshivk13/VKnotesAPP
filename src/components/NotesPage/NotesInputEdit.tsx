import React, { useRef, useState ,useId, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import API_URL from '../api';
import styles from "./navbar.module.css"
function NotesInput({initalNotes}:any) {
    const [noteText,setNoteText]=useState(initalNotes);
    const [title,setTitle]=useState("")
    const textAreaRef=useRef<any>(null);
    const [isModalVisible,setNotesModalVisible]=useState(false)
    const [beforeEditNote,setBeforeEditNote]=useState(null);
    const editNote:any=useSelector<any>((state)=>state.userReducer.noteToEdit)
    const userDetails:any=useSelector<any>((state)=>state.userReducer.userDetails)
    const url=API_URL.updateNote
    const urldel=API_URL.deleteNote
    const dispatch=useDispatch();
    const id=useId();
    console.log("userDETAILS",userDetails);

  function handleTitle(e:any){
    setTitle(e.target.value)
  }
 
  function handleNoteInput(e:any){

textAreaRef.current.style.height="auto";
  textAreaRef.current.style.height=`${e.target.scrollHeight}px`;

  setNoteText(e.target.value)
  
  }
 useEffect(()=>{
  textAreaRef.current.style.height="auto";
  textAreaRef.current.style.height=`${textAreaRef.current.scrollHeight}px`;
 })

  useEffect(()=>{
   setNoteText(editNote.note)
   setTitle(editNote.noteTitle)
   setBeforeEditNote(editNote.note);
  },[editNote])

  function submitNote(){
    const sendData={
        url:url,
        noteData:{
             id:editNote._id,
             note:noteText,
             noteTitle:title,
             beforeNote:beforeEditNote,
             userId:userDetails.id
        }
    }
    dispatch(userActions.deleteCurrentNote(editNote))
    dispatch(userActions.sendUpdatedNotesToMdb(sendData))
   dispatch(userActions.setNotetoEdit(null))
    setNotesModalVisible(false);
  }
  function deleteNote(){
    const sendData={
      url:urldel,
      dataObj:{
        id:editNote._id
      }
    }
    dispatch(userActions.deleteCurrentNotefromDb(sendData))
    dispatch(userActions.deleteCurrentNote(editNote))
       dispatch(userActions.setNotetoEdit(null))
  }
function handleClose(){
  dispatch(userActions.setNotetoEdit(null))
}
  return ( 
 
   <div className={styles.editnoteContainer}>
      <div className={styles.inputTextContainer}>    
           <div className={styles.toTypeTextInput}>
            <input onChange={handleTitle} value={title} className={styles.inputTitle} placeholder="Title" type="text"></input>
             <div className={styles.inputElement}>
             <textarea value={noteText} ref={textAreaRef}  placeholder='type something...' className={styles.textArea} onChange={handleNoteInput}></textarea>
             </div>
             <div className={styles.buttonPosition}>
             <button type='button' onClick={handleClose}>close</button>
             <button type='button' onClick={submitNote}>Done</button>
             <button type="button" onClick={deleteNote}>delete</button>
             </div>
           </div>    
        </div>
        </div>

  )
}

export default NotesInput