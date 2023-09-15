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
    cellAttacked: Colors | null = null

    constructor(
        board: Board,
        x: number,
        y: number,
        color: Colors,
        figure: Figure | null
    ) {
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

    setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target)
            this.figure.isMoved = true
            this.board.moveRecord.push(target)
            if (target.figure) {
                this.addLostFigure(target.figure)
            }
            if (
                this.figure.name === FigureNames.KING &&
                !this.board.kingCastled
            ) {
                const colorFigure =
                    this.figure.color === Colors.WHITE
                        ? Colors.WHITE
                        : Colors.BLACK
                const rookPlaceRight = this.board.getCell(target.x - 1, this.y)
                const rookPlaceLeft = this.board.getCell(target.x + 1, this.y)
                if (
                    this.board.getCell(target.x + 1, this.y).figure?.name ===
                        FigureNames.ROOK &&
                    this.board.kingCanCastledRight
                ) {
                    this.board.getCell(target.x + 1, this.y).figure = null
                    rookPlaceRight.figure = new Rook(
                        colorFigure,
                        rookPlaceRight
                    )
                    rookPlaceRight.figure.hasMovedFlag = true
                } else if (
                    this.board.getCell(target.x - 2, this.y).figure?.name ===
                        FigureNames.ROOK &&
                    this.board.kingCanCastledLeft
                ) {
                    this.board.getCell(target.x - 2, this.y).figure = null
                    rookPlaceLeft.figure = new Rook(colorFigure, rookPlaceLeft)
                    rookPlaceLeft.figure.hasMovedFlag = true
                }
            }
            this.board.updateCellsUnderAttack(target)
            target.setFigure(this.figure)
            this.figure = null
        }
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }
}
