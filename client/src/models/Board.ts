import { Bishop } from '../figures/Bishop'
import { Figure } from '../figures/Figure'
import { King } from '../figures/King'
import { Knight } from '../figures/Knight'
import { Pawn } from '../figures/Pawn'
import { Queen } from '../figures/Queen'
import { Rook } from '../figures/Rook'
import { Cell } from './Cell'
import { Colors } from './Colors'

export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    moveRecord: Cell[] = []
    arraySteps: Board[]= []
    kingCastled = false
    kingCanCastledRight = false
    kingCanCastledLeft = false
    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                }
            }
            this.cells.push(row)
        }
    }

    getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells
        if (this.lostBlackFigures)
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.lostBlackFigures = this.lostBlackFigures
        newBoard.moveRecord = this.moveRecord
        newBoard.arraySteps = this.arraySteps
        return newBoard
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    updateCellsUnderAttack(target: Cell) {
        this.cells.forEach((row) => {
            row.forEach((cell) => {
                cell.cellAttacked = null
                if (cell.figure?.canMove(target)) {
                    if (cell.figure.color === Colors.WHITE) {
                        target.cellAttacked = Colors.WHITE 
                    } else if (cell.figure.color === Colors.BLACK) {
                        target.cellAttacked = Colors.BLACK
                    }
                }
            });
        });
    }
    

    private addPawns() {
        if (this.cells.length === 0) {
            console.error(
                'Ошибка: Доска не была инициализирована. Вызовите initCells() перед addPawns().'
            )
            return
        }
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addKings() {
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }

    private addRook() {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.WHITE, this.getCell(7, 7))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(6, 7))
    }

    public addFigures() {
        this.addPawns()
        this.addBishops()
        this.addKings()
        this.addKnights()
        this.addQueens()
        this.addRook()
    }
}
