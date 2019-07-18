import { Board, nextGeneration, fromString } from './board'

describe('Board', () => {
    it('converts from input to board correctly', () => {
        const testCases = [
            {
                input: `....
**..
...*
....`,
                output: [
                    [{ alive: false }, { alive: false }, { alive: false }, { alive: false }],
                    [{ alive: true }, { alive: true }, { alive: false }, { alive: false }],
                    [{ alive: false }, { alive: false }, { alive: false }, { alive: true }],
                    [{ alive: false }, { alive: false }, { alive: false }, { alive: false }]
                ]
            }
        ]

        testCases.forEach(({ input, output }) => {
            const board = fromString(input)
            expect(board).toEqual(output)
        })
    })
    it('returns new correct board after one unit of time passes', () => {
        const testCases = [
            {
                inputBoard: [
                    [{ alive: false }, { alive: false }, { alive: false }],
                    [{ alive: false }, { alive: true }, { alive: false }],
                    [{ alive: false }, { alive: false }, { alive: false }]
                ],
                outputBoard: [
                    [{ alive: false }, { alive: false }, { alive: false }],
                    [{ alive: false }, { alive: false }, { alive: false }],
                    [{ alive: false }, { alive: false }, { alive: false }]
                ]
            },
            {
                inputBoard: [
                    [{ alive: true }, { alive: false }, { alive: false }],
                    [{ alive: false }, { alive: true }, { alive: true }],
                    [{ alive: false }, { alive: false }, { alive: false }]
                ],
                outputBoard: [
                    [{ alive: false }, { alive: true }, { alive: false }],
                    [{ alive: false }, { alive: true }, { alive: false }],
                    [{ alive: false }, { alive: false }, { alive: false }]
                ]
            },
        ]

        testCases.forEach(({ inputBoard, outputBoard }) => {
            const newBoard = nextGeneration(inputBoard)
            expect(newBoard).toEqual(outputBoard)
        })
    })
})