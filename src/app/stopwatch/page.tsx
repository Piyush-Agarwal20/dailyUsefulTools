"use client";

import React, { useState, useEffect } from "react";
import styles from "./stopwatch.module.css";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(() => {
    const savedTime = localStorage.getItem('stopwatchTime');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 10;
          localStorage.setItem('stopwatchTime', newTime.toString());
          return newTime;
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopwatch = () => setIsRunning(true);
  const stopStopwatch = () => setIsRunning(false);
  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
    localStorage.removeItem('stopwatchTime');
  };

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0"),
    };
  };

  const { days, hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className={styles.container}>
      <div className={styles.stopwatch}>
        <div className={styles.timeDisplay}>
          <span>{days}<div className={styles.timeLabel}>days</div></span>
          <span>:{hours}<div className={styles.timeLabel}>hrs</div></span>
          <span>:{minutes}<div className={styles.timeLabel}>min</div></span>
          <span>:{seconds}<div className={styles.timeLabel}>sec</div></span>
        </div>
        <div className={styles.microseconds}>{milliseconds}</div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={startStopwatch} disabled={isRunning}>
          Start
        </button>
        <button className={styles.button} onClick={stopStopwatch} disabled={!isRunning}>
          Stop
        </button>
        <button className={styles.button} onClick={resetStopwatch}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
