export type Cell = {
    alive: boolean
}

const deadOrAlive = (mainCell: Cell, numberOfLives: number): boolean => {
    if (mainCell.alive) {
        if (numberOfLives < 2) return false
        else if (numberOfLives > 3) return false

        return true
    } else {
        return numberOfLives === 3;
    }
}

export const nextLive = (mainCell: Cell, neighbors: Cell[]): Cell => {
    const numberOfLiveNeighbors = neighbors.reduce((sum, neighbor) => sum + (neighbor.alive ? 1 : 0), 0)
    return {
        alive: deadOrAlive(mainCell, numberOfLiveNeighbors)
    }
}
