import { Cell } from '../models/Cell'

const useChessNotation = (cellX: number, CellY: number) => {
    const chessNotationLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const chessNotationNumber = [8, 7, 6, 5, 4, 3, 2, 1]

    const recordX: string = chessNotationLetter[cellX]
    const recordY: number = chessNotationNumber[CellY]
    return {number: recordX, letter: recordY}
}

export default useChessNotation
