import React, { useEffect, useState, useRef } from "react";
import "./Timer.css";
// import Calender from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import moment from "moment";

function Timer({ deadline }) {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  const test = "Nov 11, 2022 00:00:00";
  // console.log(String(deadline));
  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date(String(deadline)).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, [deadline]);

  // console.log(moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a "));

  // const handleDate = (e) => {
  //   setHDate(e.target.value);
  // };
  // console.log(moment(hDate).format("MMMM Do YYYY, h:mm:ss a "));
  return (
    <div className="timer">
      <p style={{ marginLeft: "10px" }}>submission deadline</p>
      <div className="timer-details">
        <span>
          <p className="timer-digits">{timerDays}</p>
          <p> days</p>
        </span>
        <span>:</span>
        <span>
          <p className="timer-digits">{timerHours}</p>
          <p> hrs</p>
        </span>
        <span>:</span>
        <span>
          <p className="timer-digits">{timerMinutes}</p>
          <p> mins</p>
        </span>
        <span>:</span>
        <span>
          <p className="timer-digits">{timerSeconds}</p>
          <p>secs</p>
        </span>
      </div>
      <div>
        <p> set new deadline</p>
      </div>
    </div>
  );
}

export default Timer;
