import React, { useRef, useState ,useId} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import API_URL from '../api';
import styles from "./navbar.module.css"
function NotesInput() {
    const [noteText,setNoteText]=useState("");
    const [title,setTitle]=useState("");
    const textAreaRef=useRef<any>(null);
    const [isModalVisible,setNotesModalVisible]=useState(false)
          const editNote:any=useSelector<any>((state)=>state.userReducer.noteToEdit)

    const userDetails:any=useSelector<any>((state)=>state.userReducer.userDetails)
    const url=API_URL.postNote
    const dispatch=useDispatch();
    const id=useId();
    console.log("userDETAILS",userDetails);
  function handleNoteText(e:any){
   setNoteText(e.target.value);
   console.log(noteText)
  }
  function openNotesModal(){
   setNotesModalVisible(true)
  }
  function handleTitle(e:any){
    setTitle(e.target.value)
  }
  function handleNoteInput(e:any){

textAreaRef.current.style.height="auto";
  textAreaRef.current.style.height=`${e.target.scrollHeight}px`;

  setNoteText(e.target.value)
  
  }
  function submitNote(){
    if(noteText=="")
    {
       setNotesModalVisible(false);
      return;
    }
    const sendData={
        url:url,
        noteData:{
             id:id,
             note:noteText,
             noteTitle:title,
             userId:userDetails.id
        }
    }
    dispatch(userActions.sendNotesToMdb(sendData))
    setNoteText("")
    setTitle("")
     setNotesModalVisible(false)
  }

  return ( 
    <div >
   <div className={`${styles.noteContainer} `}>
      <div className={`${styles.inputTextContainer} ${editNote!=null?styles.backgroundopacity:""}`}>
          { !isModalVisible ?<div className={styles.inputAreaHeader} onClick={openNotesModal}></div> 
          :
           <div className={styles.toTypeTextInput}>
            <input value={title} onChange={handleTitle} className={styles.inputTitle} placeholder="Title" type="text"></input>
             <div className={styles.inputElement}>
             <textarea value={noteText} ref={textAreaRef}  placeholder='type something...' className={styles.textArea} onChange={handleNoteInput}></textarea>
             </div>
             <div className={styles.buttonPosition}>
             <button type='button' onClick={()=>setNotesModalVisible(false)}>close</button>
             <button type='button' onClick={submitNote}>Done</button>
             </div>
           </div>
           }
        </div>
       </div>
        </div>
  )
}

export default NotesInput