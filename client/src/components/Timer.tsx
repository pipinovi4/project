import React, {FC, useState, useRef, useEffect} from 'react';
import { Player } from '../models/Players';
import { Colors } from '../models/Colors';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void
}

const Timer: FC<TimerProps>  = ({currentPlayer, restart}) => {
  const [blackTime, setBlackTime] = useState(300)
  const [whiteTime, setWhiteTime] = useState(300)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer () {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  } 

  function decrementBlackTimer() {
    if (blackTime === 0) {
      restart()
    }
    setBlackTime(prev => prev - 1)
  }
  function decrementWhiteTimer() {
    if (whiteTime === 0) {
      restart()
    }
    setWhiteTime(prev => prev - 1)
  }
  return (
    <div>
      <div>
      <button onClick={restart}>Restart game</button>
      </div>
      <h2>White - {whiteTime}</h2>
      <h2>Black - {blackTime}</h2>
    </div>
  );
};

export default Timer;