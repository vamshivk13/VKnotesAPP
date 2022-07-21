import { call, takeEvery, put } from "redux-saga/effects";
import { userActions } from "./store";
import axios from "axios";


 function handleGetApi({payload}:any):any{
  console.log(payload)
  axios.post(payload.url,payload.userData).then((data)=>{
    console.log(data)
  }).catch((err)=>{
    console.log("ERRROR",err)
  })
}

// function* getUsersFromAPi():any {
//   console.log("herree")
//   const res= yield call(handleGetApi);

//   console.log("from WatcherACtion",res)
//   yield put(userActions.setUsers(res));
// }
function* registerUser(payload:any):any {
  console.log("herree")
 yield call(()=>handleGetApi(payload));
  //yield put(userActions.setUsers(res));
}

async function handleAuthAPi({payload}:any){
   const data=await axios.post(payload.url,payload.userData)
   return data;
}
function* authAddUser(payload:any):any{
  try{
   const res=yield call(()=>handleAuthAPi(payload))
   console.log("loginResponse",res)
   localStorage.setItem("token",res.data.token)
   yield put(userActions.setUser(res.data))
   localStorage.setItem("userID",JSON.stringify(res.data.id))
   yield put(userActions.setIsloggedIn(true));
  }catch(err){
    alert('wrong email/passcode')
  }
}

async function handleAddNoteApi({payload}:any){
   const data=await axios.post(payload.url,payload.noteData)
   return data;
}
function* sendNotesToDb(payload:any):any{
  try{
    console.log(payload);
    const resp=yield call(()=>handleAddNoteApi(payload));
    console.log("noteData",resp)
    yield put(userActions.addNotes(resp.data.result))
  }
  catch(err){
   alert("unable to add Note")
  }
}

async function handleUpdateNoteApi({payload}:any){
  console.log("updateNote",payload)
   const data=await axios.post(payload.url,payload.noteData)
   console.log("updatedReturn",data);
   return data;
}


function* sendUpdatedNotesToDb(payload:any):any{
   try{
    console.log(payload);
    const resp=yield call(()=>handleUpdateNoteApi(payload));
    console.log("Adding data to AllNotes",resp)
    yield put(userActions.addNotes(resp.data))
  }
  catch(err){
   alert("unable to add Note")
  }
}

async function handleDeleteNoteApi({payload}:any){
  console.log("deleteObj",payload)
    const res=await axios.post(payload.url,payload.dataObj)
}
function* deleteCurrentNotefromDb(payload:any):any{
   yield call(()=>handleDeleteNoteApi(payload));
}


export default function* sagaWatcher():any {
  console.log("edaesd")
  yield takeEvery("userSlice/registerUser", registerUser);
  yield takeEvery("userSlice/authAddUser", authAddUser);
  yield takeEvery("userSlice/sendNotesToMdb", sendNotesToDb);
    yield takeEvery("userSlice/sendUpdatedNotesToMdb", sendUpdatedNotesToDb);
        yield takeEvery("userSlice/deleteCurrentNotefromDb", deleteCurrentNotefromDb);
    
}


