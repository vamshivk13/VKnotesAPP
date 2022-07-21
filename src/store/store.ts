import axios from "axios";
import { createSlice,createAsyncThunk, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import  sagaWatcher from "./sagaWatcher"
// export const fetchUserById = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async () => {
//     try{
//    const res=await axios.get("https://jsonplaceholder.typicode.com/users");
//    console.log(res.data)
//    return res.data;
//     }
//     catch(err){
//       return err;
//     }
//   }
// );
interface state{
  userDetails:[],
  isLoggedIn:boolean,
  allNotes:[]
}


const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userDetails: [],
    isLoggedIn:false,
    allNotes:[],
    noteToEdit:null
  },

  reducers: {
    registerUser:(state,action)=>{
      
    },
    setUser:(state,action)=>{
      state.userDetails=action.payload;
    },
    setIsloggedIn:(state,action)=>{
     state.isLoggedIn=action.payload
    },
    authAddUser:(state,action)=>{
     
    },
    sendNotesToMdb:(state,action)=>{

    },
    sendUpdatedNotesToMdb:(state,action)=>{

    },
    addNotes:(state:any,action:any)=>{
      const data:any=action.payload;
      console.log("addedLive",data);
      state.allNotes=[action.payload,...state.allNotes]
    },
    setInitialNotes:(state:any,action:any)=>{
      state.allNotes=action.payload.reverse()
    },
    setNotetoEdit:(state:any,action:any)=>{
      state.noteToEdit=action.payload;
    },
    deleteCurrentNote:(state:any,action:any)=>{
      state.allNotes=state.allNotes.filter((item:any)=>{
        return item._id!=action.payload._id;
      })
    },
    deleteCurrentNotefromDb:(state,action)=>{
      
    }

  },
  // extraReducers: (builder:any) => {
  //   builder.addCase(fetchUserById.fulfilled, (state:any, action:any) => {
  //     console.log("responseER",action.payload)
  //     state.userDetails.push(action.payload);
  //   });
  //},
});
const saga =createSagaMiddleware();
const store= configureStore({
  reducer:{
    userReducer: userSlice.reducer
  },
  middleware:[saga]
})
saga.run(sagaWatcher)


export const userActions=userSlice.actions
export default store;