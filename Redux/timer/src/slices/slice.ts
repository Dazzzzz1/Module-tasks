import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  initialTime: number;
  remainingTime: number;
  isRunning: boolean;
  minutes: number;
  seconds: number;
}

const initialState: TimerState = {
  initialTime: 0,
  remainingTime: 0,
  isRunning: false,
  minutes: 0,
  seconds: 0
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setMinutes: (state, action: PayloadAction<number>) => {
      state.minutes = action.payload;
      state.initialTime = state.minutes * 60 + state.seconds;
      state.remainingTime = state.initialTime;
    },
    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
      state.initialTime = state.minutes * 60 + state.seconds;
      state.remainingTime = state.initialTime;
    },
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.remainingTime = state.initialTime;
    },
    decrementTime: (state) => {
      if (state.remainingTime > 0) {
        state.remainingTime -= 1;
      } else {
        state.isRunning = false;
      }
    }
  }
});

export const { 
  setMinutes, 
  setSeconds, 
  startTimer, 
  stopTimer, 
  resetTimer, 
  decrementTime 
} = timerSlice.actions;

export default timerSlice.reducer;