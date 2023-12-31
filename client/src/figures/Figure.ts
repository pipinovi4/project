import { Cell } from '../models/Cell'
import { Colors } from '../models/Colors'
import logo from '../../assets/bishop-black.png'

export enum FigureNames {
    FIGURE = 'Фигура',
    KING = 'Король',
    KNIGHT = 'Конь',
    PAWN = 'Пешка',
    QUEEN = 'Ферзь',
    ROOK = 'Ладья',
    BISHOP = 'Слон',
}

export class Figure {
    color: Colors
    logo: typeof logo | null
    cell: Cell
    name: FigureNames
    hasMovedFlag = false
    isMoved = false
    kingAttacked = false
    prevCellAttacked: number[][] = []


    constructor(color: Colors, cell: Cell) {
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = null
        this.name = FigureNames.FIGURE
    }

    setMoved(): void {
        this.hasMovedFlag = true
    }

    hasMoved(): boolean {
        return this.hasMovedFlag
    }

    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) return false
        if (target.figure?.name === FigureNames.KING && target.figure.color === this.cell.figure?.color) {
            return false
        } 
        return true
    }

    moveFigure(target: Cell) {}

}
