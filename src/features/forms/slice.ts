import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  questions_id: number[] | null;
}

const initialState: InitialState = {
  questions_id: null,
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    pushDeletedQuestionId: (state, action: PayloadAction<number>) => {
      if (state.questions_id) {
        state.questions_id.push(action.payload);
      } else {
        state.questions_id = [action.payload];
      }
    },
    clearDeletedQuestionId: (state) => {
      state.questions_id = null;
    },
    removeDeletedQuestionId: (state, action: PayloadAction<number>) => {
      if (state.questions_id) {
        state.questions_id = state.questions_id.filter(
          (id) => id !== action.payload,
        );
      }
    },
  },
});

export const {
  pushDeletedQuestionId,
  clearDeletedQuestionId,
  removeDeletedQuestionId,
} = formSlice.actions;
export default formSlice.reducer;
