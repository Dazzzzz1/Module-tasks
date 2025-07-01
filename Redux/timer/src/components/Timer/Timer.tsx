import './Timer.css'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setMinutes, 
  setSeconds, 
  startTimer, 
  stopTimer, 
  resetTimer, 
  decrementTime 
} from '../../slices/slice';
import { RootState } from '../../store/store';

const Timer = () => {
  const dispatch = useDispatch();
  const {
    remainingTime,
    isRunning,
    minutes: inputMinutes,
    seconds: inputSeconds
  } = useSelector((state: RootState) => state.timer);

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    } else if (remainingTime === 0 && isRunning) {
      dispatch(stopTimer());
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingTime, dispatch]);

  const handleStart = () => {
    if (remainingTime > 0) {
      dispatch(startTimer());
    }
  };

  const handleStop = () => {
    dispatch(stopTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  return (
    <div className="timer-container">
      <h1>Таймер</h1>
      
      <div className="time-display">
        {formatTime(remainingTime)}
      </div>
      
      <div className="input-group">
        <label>
          Минуты:
          <input
            type="number"
            min="0"
            max="59"
            value={inputMinutes}
            onChange={(e) => dispatch(setMinutes(Number(e.target.value)))}
            disabled={isRunning}
          />
        </label>
        
        <label>
          Секунды:
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={(e) => dispatch(setSeconds(Number(e.target.value)))}
            disabled={isRunning}
          />
        </label>
      </div>
      
      <div className="button-group">
        {!isRunning ? (
          <button onClick={handleStart} disabled={remainingTime <= 0}>
            Старт
          </button>
        ) : (
          <button onClick={handleStop}>Стоп</button>
        )}
        <button onClick={handleReset}>Сброс</button>
      </div>
    </div>
  );
};

export default Timer;