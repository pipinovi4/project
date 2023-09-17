import { useEffect, useState } from 'react'
import './App.scss'
import BoardComponents from './components/BoardComponents'
import { Board } from './models/Board'
import { Player } from './models/Players'
import { Colors } from './models/Colors'
import Timer from './components/Timer'
import AnalisysBoard from './components/AnalisysBoard'

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer);
    }, [])

    
    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }
  
    function swapPlayer() {
      setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }
  
    return (
      <div className="app">
        <Timer
          restart={restart}
          currentPlayer={currentPlayer}
        />
        <BoardComponents
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
            <div>
                <AnalisysBoard board={board} setBoard={setBoard} />
            </div>
        </div>
    )
}

export default App
