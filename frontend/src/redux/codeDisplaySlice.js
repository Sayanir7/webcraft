import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  codeBody:[]
};

const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        setCode: (state,action)=>{
            state.codeBody = action.payload;
        }
    },
  });
  

export const { setCode} = codeSlice.actions;
export default codeSlice.reducer;