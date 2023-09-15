import React, { FC, useEffect } from 'react'
import { Cell } from '../models/Cell'
import { FigureNames } from '../figures/Figure'
import { Colors } from '../models/Colors'
import { Board } from '../models/Board'
import useChessNotation from '../hooks/useChessNotation'

interface CellProps {
    cell: Cell
    selected: boolean
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
    const notation = useChessNotation(cell.x, cell.y)
    const kingAttacked =
        cell.cellAttacked !== cell.figure?.color &&
        cell.figure?.name === FigureNames.KING
            ? 'king-attacked'
            : ''
    return (
        <div
            className={[
                'cell',
                cell.color,
                selected ? 'selected' : '',
                kingAttacked,
            ].join(' ')}
            onClick={() => click(cell)}
            style={{
                background: cell.available && cell.figure ? '#6eb5d1' : '',
            }}
        >   
            {cell.y === 7 ? notation[0] : ''}{cell.x === 0 ? notation[1] : ''} 
            {cell.available && !cell.figure && <div className={'available'} />}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
        </div>
    )
}

export default CellComponent
