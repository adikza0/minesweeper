import { Matrix } from '../../scripts/Matrix.js';
import { Cell } from '../../scripts/Cell.js';
import { generateHTML } from '../../scripts/game.js';

describe('Matrix tests', () => {
  afterAll(() => {
    document.querySelector('.js-score').innerHTML = '';
    document.querySelector('.js-timer').innerHTML = '';
  })

  it('constructor test', () => {
    let matrix = new Matrix(5, 5, 0);
    expect(matrix.rows).toEqual(5);
    expect(matrix.columns).toEqual(5);
    expect(matrix instanceof Matrix).toEqual(true);

  })
  

  it('constructor test with invalid matrix size', () => {
    expect(() => new Matrix(0, 5, 0)).toThrowError("Matice musí mít alespoň 4 řádky.");
    expect(() => new Matrix(5, 0, 0)).toThrowError("Matice musí mít alespoň 4 sloupce.");
  })

  it('createEmptyMatrix test', () => {
    let emptyMatrix = new Matrix(5, 5, 0);
    emptyMatrix.createEmptyMatrix();
    expect(emptyMatrix.matrix.length).toEqual(5);
    expect(emptyMatrix.matrix[0].length).toEqual(5);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        expect(emptyMatrix.matrix[i][j] instanceof Cell).toEqual(true);
        expect(emptyMatrix.matrix[i][j] instanceof Cell).toEqual(true)
        expect(emptyMatrix.matrix[j][i].adjacentMines).toEqual(0);
        expect(emptyMatrix.matrix[j][i].isMine).toEqual(false);
        expect(emptyMatrix.matrix[j][i].isFlagged).toEqual(false);
        expect(emptyMatrix.matrix[j][i].isRevealed).toEqual(false);
      }
    }

    emptyMatrix = new Matrix(4, 5, 0);
    emptyMatrix.createEmptyMatrix();
    expect(emptyMatrix.matrix.length).toEqual(4);
    expect(emptyMatrix.matrix[0].length).toEqual(5);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 5; j++) {
        expect(emptyMatrix.matrix[i][j] instanceof Cell).toEqual(true);
        expect(emptyMatrix.matrix[i][j].adjacentMines).toEqual(0);
        expect(emptyMatrix.matrix[i][j].isMine).toEqual(false);
        expect(emptyMatrix.matrix[i][j].isFlagged).toEqual(false);
        expect(emptyMatrix.matrix[i][j].isRevealed).toEqual(false);
      }
    }
    emptyMatrix.stopTimer();
  })

  it('generateRandomPosition test', () => {
    const matrix = new Matrix(5, 5, 0);
    for (let i = 0; i < 20; i++) {
      let position = matrix.generateRandomPosition();
      expect(position[0]).toBeGreaterThanOrEqual(0);
      expect(position[0]).toBeLessThan(5);
      expect(position[1]).toBeGreaterThanOrEqual(0);
      expect(position[1]).toBeLessThan(5);
    }
    matrix.stopTimer();
  })

  it('generateBombs test with square matrix', () => {
    const matrix = new Matrix(5, 5, 5);
    let bombCount = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (matrix.matrix[i][j].isMine) {
          bombCount++;
        }
      }
    }
    matrix.stopTimer();
    expect(bombCount).toEqual(5);
  })

  it('generateBombs test with rectangle matrix', () => {
    const matrix = new Matrix(10, 5, 10);
    let bombCount = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        if (matrix.matrix[i][j].isMine) {
          bombCount++;
        }
      }
    }
    matrix.stopTimer();
    expect(bombCount).toEqual(10);
    
  })



  it('doesCellExist test', () => {
    const matrix = new Matrix(6, 4, 0);
    expect(matrix.doesCellExist(-1, 0)).toEqual(false);
    expect(matrix.doesCellExist(0, -1)).toEqual(false);
    expect(matrix.doesCellExist(5, 0)).toEqual(false);
    expect(matrix.doesCellExist(0, 5)).toEqual(true);
    expect(matrix.doesCellExist(0, 0)).toEqual(true);
    expect(matrix.doesCellExist(4, 4)).toEqual(false);
  })

  it('countAdjacentMines test', () => {
    const matrix = new Matrix(6, 5, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[1][1].insertBomb();
    matrix.matrix[2][2].insertBomb();
    matrix.matrix[3][3].insertBomb();
    matrix.matrix[4][4].insertBomb();
    matrix.matrix[0][3].insertBomb();
    matrix.matrix[1][3].insertBomb();
    matrix.matrix[1][4].insertBomb();
    expect(matrix.countAdjacentMines(0, 0)).toEqual(1);
    expect(matrix.countAdjacentMines(1, 1)).toEqual(2);
    expect(matrix.countAdjacentMines(2, 2)).toEqual(3);
    expect(matrix.countAdjacentMines(3, 3)).toEqual(2);
    expect(matrix.countAdjacentMines(4, 4)).toEqual(1);
    expect(matrix.countAdjacentMines(2, 4)).toEqual(1);
    expect(matrix.countAdjacentMines(5, 2)).toEqual(1);
    expect(matrix.countAdjacentMines(4, 0)).toEqual(3);
  })

  it('fillAdjacentMines test', () => {
    const matrix = new Matrix(6, 5, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[1][1].insertBomb();
    matrix.matrix[2][2].insertBomb();
    matrix.matrix[3][3].insertBomb();
    matrix.matrix[4][4].insertBomb();
    matrix.matrix[0][3].insertBomb();
    matrix.matrix[1][3].insertBomb();
    matrix.matrix[1][4].insertBomb();
    matrix.fillAdjacentMines();
    expect(matrix.matrix[0][0].adjacentMines).toEqual(1);
    expect(matrix.matrix[1][1].adjacentMines).toEqual(2);
    expect(matrix.matrix[2][2].adjacentMines).toEqual(3);
    expect(matrix.matrix[3][3].adjacentMines).toEqual(2);
    expect(matrix.matrix[4][4].adjacentMines).toEqual(1);
    expect(matrix.matrix[2][4].adjacentMines).toEqual(3);
    expect(matrix.matrix[5][2].adjacentMines).toEqual(0);
    expect(matrix.matrix[4][0].adjacentMines).toEqual(0);
  })

  it('generate matrix with more mines than cells', () => {
    expect(() => new Matrix(5, 5, 25)).toThrowError("Počet může nesmí být větší než celkový počet všech políček.");
    expect(() => new Matrix(5, 5, 28)).toThrowError("Počet může nesmí být větší než celkový počet všech políček.");
    expect(() => new Matrix(4, 4, 9)).toThrowError("Počet může nesmí být větší než celkový počet všech políček.");
    expect(() => new Matrix(4, 4, 8)).not.toThrow("Počet může nesmí být větší než celkový počet všech políček.");
  })

  it('revealCell test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();

    expect(matrix.matrix[0][0].isRevealed).toEqual(false);
    matrix.revealCell(2, 2);
    expect(matrix.matrix[1][0].isRevealed).toEqual(true);
    expect(matrix.matrix[0][0].isRevealed).toEqual(false);
    expect(matrix.matrix[0][1].isRevealed).toEqual(false);
    expect(matrix.matrix[0][2].isRevealed).toEqual(false);
    expect(matrix.matrix[0][3].isRevealed).toEqual(false);
    matrix.revealCell(1, 0);
    expect(matrix.matrix[1][0].isRevealed).toEqual(true);
    expect(matrix.matrix[0][0].isRevealed).toEqual(false);
    expect(matrix.matrix[0][1].isRevealed).toEqual(true);
    expect(matrix.matrix[0][2].isRevealed).toEqual(false);
    expect(matrix.matrix[0][3].isRevealed).toEqual(false);

  })

 it('revealAdjacentCells test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][1].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealCell(3, 3);
    expect(matrix.matrix[0][0].isRevealed).toEqual(false);
    expect(matrix.matrix[0][1].isRevealed).toEqual(false);
    expect(matrix.matrix[0][2].isRevealed).toEqual(true);
    expect(matrix.matrix[1][0].isRevealed).toEqual(true);
    expect(matrix.matrix[1][1].isRevealed).toEqual(true);
    expect(matrix.matrix[2][2].isRevealed).toEqual(true);
    expect(matrix.matrix[2][0].isRevealed).toEqual(true);
    expect(matrix.matrix[0][3].isRevealed).toEqual(true);
  })

  it('returnAdjacentCells test', () => {
    const matrix = new Matrix(4, 4, 0);
    let adjacentCells = matrix.returnAdjacentCells(0, 0);
    expect(adjacentCells[0].x).toEqual(0);
    expect(adjacentCells[0].y).toEqual(1);
    expect(adjacentCells[1].x).toEqual(1);
    expect(adjacentCells[1].y).toEqual(0);
    expect(adjacentCells[2].x).toEqual(1);
    expect(adjacentCells[2].y).toEqual(1);
    expect(adjacentCells.length).toEqual(3);
    adjacentCells = matrix.returnAdjacentCells(2, 2);
    expect(adjacentCells[0].x).toEqual(1);
    expect(adjacentCells[0].y).toEqual(1);
    expect(adjacentCells[1].x).toEqual(1);
    expect(adjacentCells[1].y).toEqual(2);
    expect(adjacentCells[2].x).toEqual(1);
    expect(adjacentCells[2].y).toEqual(3);

    expect(adjacentCells[3].x).toEqual(2);
    expect(adjacentCells[3].y).toEqual(1);
    expect(adjacentCells[4].x).toEqual(2);
    expect(adjacentCells[4].y).toEqual(3);

    expect(adjacentCells[5].x).toEqual(3);
    expect(adjacentCells[5].y).toEqual(1);
    expect(adjacentCells[6].x).toEqual(3);
    expect(adjacentCells[6].y).toEqual(2);
    expect(adjacentCells[7].x).toEqual(3);
    expect(adjacentCells[7].y).toEqual(3);
    expect(adjacentCells.length).toEqual(8);
  })
  it('changeFlagStateOnCell test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();

    //const matrix = new Matrix(4, 4, 1);
    expect(matrix.matrix[0][1].isFlagged).toEqual(false);
    matrix.changeFlagStateOnCell(1, 0);
    expect(matrix.matrix[0][1].isFlagged).toEqual(false);
    matrix.revealCell(2, 2);
    matrix.changeFlagStateOnCell(1, 0);
    expect(matrix.matrix[0][1].isFlagged).toEqual(true);
    matrix.changeFlagStateOnCell(1, 0);
    expect(matrix.matrix[0][1].isFlagged).toEqual(false);
  })
  it('isItSafeToRevealAdjacent test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealCell(2, 2);
    expect(matrix.isItSafeToRevealAdjacent(1, 1)).toEqual(false);
    expect(matrix.isItSafeToRevealAdjacent(0, 1)).toEqual(false);
    matrix.changeFlagStateOnCell(0, 0);
    expect(matrix.isItSafeToRevealAdjacent(1, 1)).toEqual(false);
    expect(matrix.isItSafeToRevealAdjacent(0, 1)).toEqual(true);
  })
  it('revealAdjacent test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealCell(2, 2);
    matrix.changeFlagStateOnCell(0, 0);
    matrix.revealAdjacent(0, 1);
    expect(matrix.matrix[0][0].isRevealed).toEqual(false);
    expect(matrix.matrix[0][1].isRevealed).toEqual(true);
    expect(matrix.matrix[0][2].isRevealed).toEqual(false);
  })
  it('returnUnrevealedCellCount test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.bombCount = 2;
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    expect(matrix.returnUnrevealedCellCount()).toEqual(16);
    matrix.revealCell(2, 2)
    expect(matrix.returnUnrevealedCellCount()).toEqual(4);
    matrix.revealCell(1, 0)
    expect(matrix.returnUnrevealedCellCount()).toEqual(3);
  })

  it('gameWon test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.bombCount = 1;
    matrix.matrix[0][0].insertBomb(0, 0);
    matrix.fillAdjacentMines();

    expect(matrix.gameWon).toEqual(false);
    matrix.revealCell(2, 0);
    expect(matrix.gameWon).toEqual(true);
  })

  it('first reveal on 0 test', () => {
    for (let i = 0; i < 50; i++) {
      const matrix = new Matrix(5, 5, 10);
      matrix.revealCell(1, 1);
      expect(matrix.matrix[0][0].isRevealed).toEqual(true);
      expect(matrix.matrix[1][1].isRevealed).toEqual(true);
      expect(matrix.matrix[2][2].isRevealed).toEqual(true);
      expect(matrix.matrix[1][1].isMine).toEqual(false);
      expect(matrix.matrix[1][1].adjacentMines).toEqual(0);

    }
  })
  it('getFlaggedCellsCount test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    matrix.bombCount = 2;
    expect(matrix.getFlaggedCellsCount()).toEqual(0);
    matrix.revealCell(2, 2);
    expect(matrix.getFlaggedCellsCount()).toEqual(0);
    matrix.changeFlagStateOnCell(1, 0);
    expect(matrix.getFlaggedCellsCount()).toEqual(1);
    matrix.changeFlagStateOnCell(0, 0);
    expect(matrix.getFlaggedCellsCount()).toEqual(2);
    matrix.changeFlagStateOnCell(1, 0);
    expect(matrix.getFlaggedCellsCount()).toEqual(1);
  })

  it('timeCount test', (done) => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.matrix[0][2].insertBomb();
    matrix.fillAdjacentMines();
    matrix.bombCount = 2;
    matrix.revealCell(2, 2);
    setTimeout(() => {
      console.log(matrix.timeCount)
      setTimeout(() => {
        expect(matrix.timeCount).toEqual(1);
      }, 1100)
      setTimeout(() => {
        expect(matrix.timeCount).toEqual(2);
      }, 2000)
      setTimeout(() => {
        expect(matrix.timeCount).toEqual(3);
        done();
      }, 3000)
    })
  }) 
});
