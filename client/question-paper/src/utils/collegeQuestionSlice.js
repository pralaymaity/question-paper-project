import { createSlice } from "@reduxjs/toolkit";

const collegeQuestionSlice = createSlice({
    name:"collge-Question",
    initialState:{
        collegeQuestionStorage : []
    },
    reducers : {
        storeQuestion :(state , action)=>{
            state.collegeQuestionStorage.push(action.payload)
        } 
    }
})

export const {storeQuestion} = collegeQuestionSlice.actions;
export default collegeQuestionSlice.reducer;