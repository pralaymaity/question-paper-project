import { configureStore } from "@reduxjs/toolkit";
import questionList from "./questionListSlice"

const appStore = configureStore({
    reducer:{
        questions:questionList
    }
})
export default appStore;