import { useEffect, useState } from 'react'
import './App.scss'
import BoardComponents from './components/BoardComponents'
import { Board } from './models/Board'
import { Player } from './models/Players'
import { Colors } from './models/Colors'
import LostFigures from './components/lostFigures'
import Timer from './components/Timer'

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player>(blackPlayer)

    useEffect(() => {
        restart()
    }, [])

    
    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }
    function swapPlayer() {
        setCurrentPlayer(currentPlayer.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }
    return (
        <div className="app">
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <BoardComponents board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
            <div>
                <LostFigures figures={board.lostBlackFigures} title='lost black figures'/>
                <LostFigures figures={board.lostWhiteFigures} title='lost white figures'/>
            </div>
        </div>
    )
}

export default App
