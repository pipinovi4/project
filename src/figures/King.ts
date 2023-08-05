import { Cell } from '../models/Cell'
import { Colors } from '../models/Colors'
import { Figure, FigureNames } from './Figure'
import blackLogo from '../assets/black-king.png'
import whiteLogo from '../assets/white-king.png'
import { Rook } from './Rook'

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING
    }

    canMove(target: Cell): boolean {
        const xDiff = Math.abs(this.cell.x - target.x)
        const yDiff = Math.abs(this.cell.y - target.y)

        if (!super.canMove(target)) return false
        if (xDiff <= 1 && yDiff <= 1) return true
        if (this.canCastleRight(target)) return true
        if (this.canCastleLeft(target)) return true

        return false
    }
    //castling check on the part of white
    canCastleRight(target: Cell): boolean {
        const direction = 1
        const castlingStepsRight = 2
        //right side check
        if (
            target.x === this.cell.x + castlingStepsRight &&
            target.y === this.cell.y && !this.cell.board.kingCastled
        ) {
            for (let x = this.cell.x; x < target.x; x += direction) {
                if (
                    this.cell.board.getCell(x, this.cell.y).cellAttacked &&
                    !this.cell.board.getCell(x, this.cell.y).isEmpty()
                ) {
                    break
                }
                if (this.cell.figure) {
                    // this.cell.board.kingCastled = true;
                    this.cell.board.kingCanCastledRight = true
                }       
                return true
            }  
        }
        return false
    }
    //castling check on the part of black
    canCastleLeft(target: Cell): boolean {
        const direction = -1
        const castlingStepsLeft = -2
        //left side check
        if (
            target.x === this.cell.x + castlingStepsLeft &&
            target.y === this.cell.y && !this.cell.board.kingCastled
        ) {
            for (let x = this.cell.x; x > target.x; x = x + direction) {
                // const cell = this.cell.board.getCell(x, this.cell.y);
                if (
                    this.cell.board.getCell(x, this.cell.y).cellAttacked &&
                    !this.cell.board.getCell(x, this.cell.y).isEmpty()
                ) {
                    break
                }
                if (this.cell.figure) {
                    // this.cell.board.kingCastled = true;
                    this.cell.board.kingCanCastledLeft = true
                }                
                return true
            }
        }
        
        return false
    }
}
