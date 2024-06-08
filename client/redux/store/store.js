import { configureStore } from '@reduxjs/toolkit';
import contactSlice from '../state-slice/contact-slice';


const store = configureStore({
  reducer: {getData:contactSlice}
})

export default store