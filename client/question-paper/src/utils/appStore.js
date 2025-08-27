import { configureStore } from "@reduxjs/toolkit";
import questionList from "./questionListSlice"
import collegeQuestionSlice from "./collegeQuestionSlice"
import selectQuestionSlice from "./selectQuestionSlice"

const appStore = configureStore({
    reducer:{
        questions:questionList,
        collegeQuestion : collegeQuestionSlice,
        selectedQuestions : selectQuestionSlice
    }
})
export default appStore;


