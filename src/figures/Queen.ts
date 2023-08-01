import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../assets/white-queen.png";
import blackLogo from "../assets/black-queen.png";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.QUEEN;
      }

      canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (this.cell.isEmptyVertical(target)) return true
        if (this.cell.isEmptyHorizontal(target)) return true
        if (this.cell.isEmptyDiagonal(target)) return true
        return false
    }
}