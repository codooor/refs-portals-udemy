import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

// when you have a value that must be saved in it's current form but do not want to update the UI. useRef is useful

// useRef is a React Hook that lets you reference a value that’s not needed for rendering.

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(); // make sure the value is not lost when the useState re-executes
  const dialogModal = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // runs if timer runs out
  if (timeRemaining <= 0) {
    clearInterval(timer.current);

    dialogModal.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  // manual stoppage
  function handleStop() {
    clearInterval(timer.current);
    dialogModal.current.open();
  }

  return (
    <>
      <ResultModal ref={dialogModal} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'}</button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
