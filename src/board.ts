import { Cell, nextLive } from "./cell"

export type Board = Cell[][]

const isOutOfBound = (cells: Cell[][]) => (row: number, column: number) => row < 0 || row >= cells.length || column < 0 || column >= cells[0].length

const getCell = (cells: Cell[][]) => (rowIndex: number, columnIndex: number): Cell => isOutOfBound(cells)(rowIndex, columnIndex) ? { alive: false } : cells[rowIndex][columnIndex]

const getNeighborsOf = ( cells: Cell[][], rowIndex: number, columnIndex: number): Cell[] =>
    [
        getCell(cells)(rowIndex - 1, columnIndex - 1),
        getCell(cells)(rowIndex - 1, columnIndex),
        getCell(cells)(rowIndex - 1, columnIndex + 1),
        getCell(cells)(rowIndex, columnIndex - 1),
        getCell(cells)(rowIndex, columnIndex + 1),
        getCell(cells)(rowIndex + 1, columnIndex - 1),
        getCell(cells)(rowIndex + 1, columnIndex),
        getCell(cells)(rowIndex + 1, columnIndex + 1),
    ]

export const fromString = (input: string): Board => {
    return [
        [{ alive: false }, { alive: false }, { alive: false }, { alive: false }],
        [{ alive: true }, { alive: true }, { alive: false }, { alive: false }],
        [{ alive: false }, { alive: false }, { alive: false }, { alive: true }],
        [{ alive: false }, { alive: false }, { alive: false }, { alive: false }]
    ]
}

export const nextGeneration = (cells: Board): Board => {
    const newBoard = cells.reduce((cellsBoard, cellsRow, rowIndex): Cell[][] => {
        const newCellsRow = cellsRow.reduce((newCellsRow, cell, columnIndex): Cell[] => {
            newCellsRow.push(nextLive(cell, getNeighborsOf(cells, rowIndex, columnIndex)))
            return newCellsRow
        }, [])
        cellsBoard.push(newCellsRow)
        return cellsBoard
    }, [] as Cell[][])

    return newBoard
}