import React from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/store';
import styles from './navbar.module.css'
function NoteItem({dataItem}:any) {
  const dispatch=useDispatch();
  function expandNote(){
   dispatch(userActions.setNotetoEdit(dataItem))
  }
  return (
    <div onClick={expandNote} className={styles.noteTopContainer}>
    <div className={styles.noteTitle}>{dataItem.noteTitle}</div>
    <div className={styles.noteItem}>
    
     {dataItem.note}
    
    </div>
    </div>
  )
}

export default NoteItem