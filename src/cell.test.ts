import { Cell, nextLive } from './cell';

function generateLivingNeighbors(number: number): Cell[] {
  const maxNumberOfNeighbors = 8
  const livingCells = Array.from({ length: number },(v,k) => k+1).reduce((cells) => {
    cells.push({ alive: true })
    return cells },
  [])
  const deadCells = Array.from({ length: maxNumberOfNeighbors-number },(v,k) => k+1).reduce((cells) => {
    cells.push({ alive: false })
    return cells },
  [])

  return [...livingCells, ...deadCells]
}

describe('Cell', () => {
  describe('first rule', () => {
    it('should die when it has fewer than 2 live neighbors', () => {
      const neighbors = generateLivingNeighbors(1)
      const mainCell = { alive: true }
      const nextLiveMainCell = nextLive(mainCell, neighbors)
      expect(nextLiveMainCell.alive).toBeFalsy()
    })
  })

  describe('second rule', () => {
    it('should die when it has more than 3 live neighbors', () => {
      const neighbors = generateLivingNeighbors(4)
      const mainCell = { alive: true }
      const nextLiveMainCell = nextLive(mainCell, neighbors)
      expect(nextLiveMainCell.alive).toBeFalsy()
    })
  })

  describe('third rule', () => {
    it('should live when it has 2 live neighbors', () => {
      const neighbors = generateLivingNeighbors(2)
      const mainCell = { alive: true }
      const nextLiveMainCell = nextLive(mainCell, neighbors)
      expect(nextLiveMainCell.alive).toBeTruthy()
    })
    it('should live when it has 3 live neighbors', () => {
      const neighbors = generateLivingNeighbors(3)
      const mainCell = { alive: true }
      const nextLiveMainCell = nextLive(mainCell, neighbors)
      expect(nextLiveMainCell.alive).toBeTruthy()
    })
  })

  describe('fourth rule', () => {
    it('should be resurrected when it has 3 exact neighbors and is currently dead', () => {
      const neighbors = generateLivingNeighbors(3)
      const mainCell = { alive: false }
      const nextLiveMainCell = nextLive(mainCell, neighbors)
      expect(nextLiveMainCell.alive).toBeTruthy()
    })
  })
})
