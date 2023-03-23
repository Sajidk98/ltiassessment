import { createSlice } from "@reduxjs/toolkit";
import data from "./data.json";

export const eventReducer = createSlice({
  name: "events",
  initialState: {
    events: data.events,
  },
  reducers: {
    addEvent: (state, action) => {
      const newEvent = action.payload;
      const userId = localStorage.getItem('user')
      state.events.push({...newEvent, eventId: state.events.length+1, userId})
    },
    deleteEvent: (state, action) =>{
      state.events = state.events.filter((item)=>item.eventId !==action.payload)
    },
    editEvent: (state, action)=>{
      state.events = state.events.map((item)=>{
        if(item.eventId === action.payload.id){
          return {
            ...item, 
            ...action.payload.data
          }
        }
        return item
      })
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const currentIndex = state.users.findIndex((item) => item.email == email);
      if (currentIndex < 0 || password === state.users[currentIndex].password) {
        state.user = {
          ...state.user,
          errormsg: "Incorrect user or password",
          isLoggedIn: false,
          error: true,
        };
      } else {
        state.user = {
          ...state.user,
          isLoggedIn: true,
          error: false,
        };
      }
    },
  },
});

export const { login, addEvent, deleteEvent, editEvent } = eventReducer.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const signUp = (values) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(addUser(values));
//   }, 1000);
// };

export const asyncLogin = (values) => (dispatch) => {
  setTimeout(() => {
    dispatch(login(values));
  }, 1000);
};


export default eventReducer.reducer;
