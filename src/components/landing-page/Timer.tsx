import React, { useState, useEffect } from "react";

interface TimerProps {
  deadline: string; // Deadline date in string format
}

const Timer: React.FC<TimerProps> = ({ deadline }) => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="timer">
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-sm">Days</span>
          <span className="text-2xl font-semibold">{days}</span>
        </div>
        <p>:</p>
        <div className="flex flex-col items-center">
          <span className="text-sm">Hours</span>
          <span className="text-2xl font-semibold">{hours}</span>
        </div>
        <p>:</p>
        <div className="flex flex-col items-center">
          <span className="text-sm">Minutes</span>
          <span className="text-2xl font-semibold">{minutes}</span>
        </div>
        <p>:</p>
        <div className="flex flex-col items-center">
          <span className="text-sm">Seconds</span>
          <span className="text-2xl font-semibold">{seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
