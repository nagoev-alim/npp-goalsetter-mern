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
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    resetGoalState: () => initialState,
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
        // state.goals.push(payload);
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
  // extraReducers: {
  //   // Get goals
  //   [getGoals.pending]: (state) => {
  //     state.status = 'loading';
  //   },
  //   [getGoals.fulfilled]: (state, { payload }) => {
  //     state.status = 'success';
  //     state.goals = payload;
  //   },
  //   [getGoals.rejected]: (state, { payload }) => {
  //     state.status = 'failed';
  //     state.error = true;
  //     state.message = payload;
  //   },
  //   // Create goal
  //   [createGoal.pending]: (state) => {
  //     state.status = 'loading';
  //   },
  //   [createGoal.fulfilled]: (state, { payload }) => {
  //     state.status = 'success';
  //     state.goals.push(payload);
  //   },
  //   [createGoal.rejected]: (state, { payload }) => {
  //     state.status = 'failed';
  //     state.error = true;
  //     state.message = payload;
  //   },
  //   // Update goal
  //   [updateGoal.pending]: (state) => {
  //     state.status = 'loading';
  //   },
  //   [updateGoal.fulfilled]: (state, { payload }) => {
  //     state.status = 'success';
  //   },
  //   [updateGoal.rejected]: (state, { payload }) => {
  //     state.status = 'failed';
  //     state.error = true;
  //     state.message = payload;
  //   },
  //   // Delete goal
  //   [deleteGoal.pending]: (state) => {
  //     state.status = 'loading';
  //   },
  //   [deleteGoal.fulfilled]: (state, { payload }) => {
  //     state.status = 'success';
  //     state.goals = state.goals.filter(goals => goals._id !== payload);
  //   },
  //   [deleteGoal.rejected]: (state, { payload }) => {
  //     state.status = 'failed';
  //     state.error = true;
  //     state.message = payload;
  //   },
  // },
});

export const { resetGoalState } = goalsSlice.actions;
export const goalsReducer = goalsSlice.reducer;
export const goalsSelect = {
  all: ({ goals }) => goals,
};
