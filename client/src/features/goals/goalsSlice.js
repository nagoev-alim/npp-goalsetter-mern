import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { goalService } from './goalService.js';

const CONSTANTS = {
  get: 'goals/get',
  create: 'goals/create',
  update: 'goals/update',
  delete: 'goals/delete',
};

export const getGoals = createAsyncThunk(CONSTANTS.get, goalService.get);
export const createGoal = createAsyncThunk(CONSTANTS.create, goalService.create);
export const updateGoal = createAsyncThunk(CONSTANTS.update, goalService.update);
export const deleteGoal = createAsyncThunk(CONSTANTS.delete, goalService.delete);

const initialState = {
  goals: [],
  status: 'idle',
  error: false,
  message: '',
  editStatus: {
    isEditable: false,
    item: null,
  },
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    resetGoalState: () => initialState,
    setEditStatus: (state, { payload }) => {
      state.editStatus = payload;
    },
  },
  extraReducers: builder => {
    builder
      // Get goals
      .addCase(getGoals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGoals.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.goals = payload;
      })
      .addCase(getGoals.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Create goal
      .addCase(createGoal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createGoal.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.goals.push(payload);
      })
      .addCase(createGoal.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Update goal
      .addCase(updateGoal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateGoal.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.goals.findIndex(goal => goal._id === payload._id);
        const newArray = [...state.goals];
        newArray[index].text = payload.text;
        state.goals = newArray;
      })
      .addCase(updateGoal.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Delete goal
      .addCase(deleteGoal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteGoal.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.goals = state.goals.filter(goals => goals._id !== payload);
      })
      .addCase(deleteGoal.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

export const { resetGoalState, setEditStatus } = goalsSlice.actions;
export const goalsReducer = goalsSlice.reducer;
export const goalsSelect = {
  all: ({ goals }) => goals,
};
