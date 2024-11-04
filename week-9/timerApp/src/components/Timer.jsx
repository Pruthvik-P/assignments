import {useState, useEffect } from "react";
import style from "./Timer.module.css";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [editState, setEditState] = useState(false);

  useEffect(()=>{
    const progress = setInterval > 0 ? ((initialTime - time) / initialTime) * 100 : 0
    document.documentElement.style.setProperty('--progress', `${progress}%`);
  }, [time, initialTime]);

  useEffect(()=>{
    let interval = null;
    if(isRunning && time > 0){
      interval = setInterval(()=>{
        setTime((prevTime) => time - 1);
      },1000);
    } else if(time === 0){
      setIsRunning(false);
    }
    return () =>{
      if(interval) clearInterval(interval);
    }
  }, [isRunning, time]);

}

 
export default Timer