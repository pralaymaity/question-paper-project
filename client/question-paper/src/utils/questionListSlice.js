
import { createSlice } from "@reduxjs/toolkit";


const questionListSlice = createSlice({
    name : 'questionList',
    initialState :{
        list:[]
    },
    reducers:{
        addQuestion : (state,action)=>{
            state.list.push(action.payload)
        },
        removeQuestion: (state, action) => {
            state.list.pop();
        }

    }
})

export default questionListSlice.reducer;
export const {addQuestion , removeQuestion} = questionListSlice.actions;