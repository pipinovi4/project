import { FC, useEffect } from 'react'
import { Cell } from '../models/Cell'
import { FigureNames } from '../figures/Figure'
import useChessNotation from '../hooks/useChessNotation'
import { Colors } from '../models/Colors'

interface CellProps {
    cell: Cell
    selected: boolean
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
    const notation = useChessNotation(cell.x, cell.y)
    const kingAttacked =
        cell.cellAttacked.includes(cell.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE) &&
        cell.figure &&
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
            {cell.x};{cell.y}
            {cell.y === 7 && (
                <div className="notation-number">{notation.number}</div>
            )}
            {cell.x === 0 && (
                <div className="notation-letter">{notation.letter}</div>
            )}

            {cell.available && !cell.figure && <div className={'available'} />}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
        </div>
    )
}

export default CellComponent
