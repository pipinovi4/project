import React, {FC, useState, useRef, useEffect, useCallback} from 'react';
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

  const decrementBlackTimer = useCallback(() => {
    if (blackTime === 0) {
      restart()
    }
    setBlackTime(prev => prev - 1)
  }, [blackTime, restart])

  const decrementWhiteTimer = useCallback(() => {
    if (whiteTime === 0) {
      restart()
    }
    setWhiteTime(prev => prev - 1)
  },[restart, whiteTime])
  
  const startTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }, [currentPlayer?.color, decrementBlackTimer, decrementWhiteTimer])
  
  useEffect(() => {
    startTimer()
  }, [currentPlayer, startTimer])


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