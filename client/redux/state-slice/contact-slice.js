import { createSlice } from '@reduxjs/toolkit'

export const contactSlice = createSlice({
  name: 'data',
  initialState: {
    data:[],
  },

  reducers: {
    setData:(state, action)=>{
        state.data=action.payload
    }
  },
})

export const {setData} = contactSlice.actions
export default contactSlice.reducer;



