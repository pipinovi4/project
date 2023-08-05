import React, { FC } from 'react'
import LostFigures from './LostFigures'
import { Board } from '../models/Board'
import '../App.scss'
import BatchView from './BatchView';

interface AnalysisBoardProps {
    board: Board;
    setBoard: (board: Board) => void
}

const AnalysisBoard: FC<AnalysisBoardProps> = ({board, setBoard}) => {
    return (
        <div className='analysis-board'>
            <LostFigures
                figures={board.lostBlackFigures}
                title="lost black figures"
            />
            <LostFigures
                figures={board.lostWhiteFigures}
                title="lost white figures"
            />
            <BatchView board={board} setBoard={setBoard}/>
        </div>
    )
}

export default AnalysisBoard
