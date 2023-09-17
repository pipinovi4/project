import { Figure, FigureNames } from '../figures/Figure'
import { Rook } from '../figures/Rook'
import { Board } from './Board'
import { Colors } from './Colors'

export class Cell {
    readonly x: number
    readonly y: number
    readonly color: Colors
    figure: Figure | null
    board: Board
    available: boolean
    id: number
    cellAttacked: Array<Colors> = []

    constructor(board: Board, x: number, y: number, color: Colors) {
        this.x = x
        this.y = y
        this.color = color
        this.board = board
        this.figure = null
        this.available = false
        this.id = Math.random()
    }

    isEmpty(): boolean {
        return this.figure === null
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure.color
        }
        return false
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false

        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false

        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)

        if (absY !== absX) return false

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
                return false
        }
        return true
    }

    castleMove(target: Cell) {
        const rookCell =
            target.x - this.x === 2
                ? this.board.getCell(target.x + 1, this.y)
                : this.board.getCell(target.x - 2, this.y)

        if (this.figure && rookCell.figure) {
            const newX = this.x + (target.x - this.x) / 2
            const newRookCell = this.board.getCell(newX, this.y)
            newRookCell.figure = new Rook(
                this.figure.color,
                this.board.cells[this.y][newX]
            )

            // Устанавливаем флаги isMoved для короля и ладьи
            this.figure.isMoved = true
            newRookCell.figure.isMoved = true

            // Очищаем начальные клетки
            rookCell.figure = null
        }
    }

    updateCellsUnderAttack() {
        this.board.cells.forEach((row) => {
            row.forEach((cell) => {
                cell.cellAttacked = []
            })
        })

        this.board.cells.forEach((row) => {
            row.forEach((cell) => {
                if (cell.figure) {
                    for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                            const targetCell = this.board.getCell(i, j)
                            if (cell.figure.canMove(targetCell)) {
                                // Сравниваем клетки по их объектам, а не содержимому
                                console.log('cell', targetCell)
                                if (
                                    !targetCell.cellAttacked.includes(
                                        cell.figure.color
                                    )
                                ) {
                                    targetCell.cellAttacked.push(
                                        cell.figure.color
                                    )
                                }
                            }
                        }
                    }
                }
            })
        })
    }

    setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.isMoved = true
            this.board.moveRecord.push(target)
            this.figure.moveFigure(target)
            if (this.figure.name === FigureNames.KING && Math.abs(target.x - this.x) === 2) {
                this.castleMove(target)
            }
            if (target.figure) {
                this.addLostFigure(target.figure)
            }
            target.setFigure(this.figure)
            this.figure = null
            this.updateCellsUnderAttack()
        }
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }
}
