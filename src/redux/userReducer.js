import { createSlice } from '@reduxjs/toolkit'
import data from './data.json'

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    users: data.users,
  },
  reducers: {
    addUser: (state, action) => {
      const id =  state.users.length+1
     state.users.push({...action.payload, id})
     localStorage.setItem('user', id)
    }
  }
})

export const { addUser } = userReducer.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.user

export default userReducer.reducer