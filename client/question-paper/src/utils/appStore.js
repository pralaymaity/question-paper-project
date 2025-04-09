import { configureStore } from "@reduxjs/toolkit";
import questionList from "./questionListSlice"
import collegeQuestionSlice from "./collegeQuestionSlice"

const appStore = configureStore({
    reducer:{
        questions:questionList,
        collegeQuestion : collegeQuestionSlice
    }
})
export default appStore;