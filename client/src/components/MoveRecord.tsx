import React, { FC, useEffect, useState } from 'react'
import { Cell } from '../models/Cell'
import useChessNotation from '../hooks/useChessNotation'
import { Figure, FigureNames } from '../figures/Figure'

interface MoveRecordProps {
    moveRecord: Cell[]
}

interface RecordStep {
    x: number
    y: number
    figure: Figure | null
}

const MoveRecord: FC<MoveRecordProps> = ({ moveRecord }) => {
    const [recordSteps, setRecordSteps] = useState<RecordStep[]>([])
    const moveNumber = moveRecord.length

    useEffect(() => {
        if (moveRecord[moveNumber - 1]) {
            const lastMove = moveRecord[moveNumber - 1]
            const newStep: RecordStep = {
                x: lastMove.x,
                y: lastMove.y,
                figure: lastMove.figure,
            }
            setRecordSteps((prevSteps) => [...prevSteps, newStep])
        }
    }, [moveRecord.length])

    return (
        <div className="move-record">
            {recordSteps.map((cell, index) => {
                const chessNotation = useChessNotation(cell.x, cell.y)
                return (
                    <>
                        {cell.figure?.logo &&
                            cell.figure.name !== FigureNames.PAWN && (
                                <img
                                    style={{ width: '20px' }}
                                    src={cell.figure.logo}
                                    alt={`${
                                        (cell.figure.color, cell.figure.name)
                                    }`}
                                ></img>
                            )}
                        <h3>
                            {index + 1}. {chessNotation[0]}
                            {chessNotation[1]}
                        </h3>
                    </>
                )
            })}
        </div>
    )
}

export default MoveRecord
