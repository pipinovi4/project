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

        if (
            !super.canMove(target) ||
            target.cellAttacked.includes(this.getOpponentColor())
        )
            return false
        if (xDiff <= 1 && yDiff <= 1) return true
        if (this.canCastle(target)) return true
        return false
    }

    getOpponentColor(): Colors {
        return this.cell.figure?.color === Colors.WHITE
            ? Colors.BLACK
            : Colors.WHITE
    }

    canCastle(target: Cell): boolean {
        if (
            !this.cell.figure?.isMoved &&
            !this.cell.cellAttacked.includes(this.getOpponentColor()) &&
            target.y === this.cell.y &&
            Math.abs(this.cell.x - target.x) === 2
        ) {
            if (target.x > this.cell.x) {
                // Castle left
                for (let x = this.cell.x + 1; x < target.x; x++) {
                    const intermediateCell = this.cell.board.getCell(x, this.cell.y);
                    if (
                        !intermediateCell.isEmpty() ||
                        intermediateCell.cellAttacked.includes(this.getOpponentColor())
                    ) {
                        console.log(`Cannot castle left: intermediateCell (${x}, ${this.cell.y}) is not empty or attacked by opponent.`);
                        return false;
                    }
                }
                const rookCell = this.cell.board.getCell(target.x + 1, this.cell.y);
                if (
                    !rookCell.isEmpty() &&
                    rookCell.figure instanceof Rook &&
                    !rookCell.figure.isMoved
                ) {
                    return true;
                } else {
                    console.log(`Cannot castle left: rookCell (${target.x + 1}, ${this.cell.y}) is not a valid rook or has moved.`);
                }
            } else {
                // Castle right
                for (let x = this.cell.x - 1; x > target.x; x--) {
                    const intermediateCell = this.cell.board.getCell(x, this.cell.y);
                    if (
                        !intermediateCell.isEmpty() ||
                        intermediateCell.cellAttacked.includes(this.getOpponentColor())
                    ) {
                        console.log(`Cannot castle right: intermediateCell (${x}, ${this.cell.y}) is not empty or attacked by opponent.`);
                        return false;
                    }
                }
                const rookCell = this.cell.board.getCell(target.x - 2, this.cell.y);
                if (
                    !rookCell.isEmpty() &&
                    rookCell.figure instanceof Rook &&
                    !rookCell.figure.isMoved
                ) {
                    return true;
                } else {
                    console.log(`Cannot castle right: rookCell (${target.x - 2}, ${this.cell.y}) is not a valid rook or has moved.`);
                }
            }
        } else {
            console.log(`Cannot castle: King has moved (${this.cell.figure?.isMoved}), is attacked (${this.cell.cellAttacked}), or invalid target.`);
        }
        return false;
    }
    
}
