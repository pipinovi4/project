import { Cell } from '../models/Cell'
import { Colors } from '../models/Colors'
import { Figure, FigureNames } from './Figure'
import blackLogo from '../assets/black-king.png'
import whiteLogo from '../assets/white-king.png'

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING
    }

    canMove(target: Cell): boolean {
        const xDiff = Math.abs(this.cell.x - target.x)
        const yDiff = Math.abs(this.cell.y - target.y)

        for (let x = 4; x !== 8; x++) {
            if (this.cell.board.getCell(x, this.cell.y).isEmpty() && )
        }   

        if (!super.canMove(target)) return false
        if (xDiff <= 1 && yDiff <= 1) return true

        return false
    }
}
