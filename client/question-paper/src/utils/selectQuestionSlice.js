
import { createSlice } from '@reduxjs/toolkit';

const selectQuestionSlice = createSlice({
  name: 'selectedQuestions',
  initialState: {
    highlights: [], // only question IDs for UI highlighting
    groupCounts: {
      A: 0,
      B: 0,
      C: 0,
    },
  },
  reducers: {
     addQuestion: (state, action) => {
      const { eachQuestionId, group } = action.payload;

      const alreadySelected = state.highlights.includes(eachQuestionId);

      if (!alreadySelected) {
        state.highlights.push(eachQuestionId);
        state.groupCounts[group] = state.groupCounts[group] + 1;
      }
    },
    removeQuestion: (state, action) => {
      const { eachQuestionId, group } = action.payload;
      state.highlights = state.highlights.filter(qid => qid !== eachQuestionId);
      state.groupCounts[group] -= 1;
    },
    clearAllQuestions: (state) => {
      state.highlights = [];
      state.groupCounts = { A: 0, B: 0, C: 0 };
    },
  },
});

export const {  addQuestion, removeQuestion, clearAllQuestions } = selectQuestionSlice.actions;
export default selectQuestionSlice.reducer;
