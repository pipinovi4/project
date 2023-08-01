import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import CellComponents from './CellComponents'
import { Cell } from '../models/Cell'
import { Player } from '../models/Players'

interface BoardProps {
    board: Board
    setBoard: (board: Board) => void
    currentPlayer: Player
    swapPlayer: () => void
}

const BoardComponents: FC<BoardProps> = ({
    board,
    setBoard,
    currentPlayer,
    swapPlayer,
}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    const click = (cell: Cell) => {
        if (
            selectedCell &&
            selectedCell !== cell &&
            selectedCell.figure?.canMove(cell)
        ) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        } else {
            if (cell.figure?.color !== currentPlayer.color) {
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    const highlightCells = () => {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3>Current player - {currentPlayer.color}</h3>
            <div className="board">
                {board.cells.map((row, index) => {
                    return (
                        <React.Fragment key={index}>
                            {row.map((cell) => {
                                return (
                                    <CellComponents
                                        key={cell.id}
                                        cell={cell}
                                        click={click}
                                        selected={
                                            cell.x === selectedCell?.x &&
                                            cell.y === selectedCell?.y
                                        }
                                    />
                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default BoardComponents
