import { Matrix } from '../../scripts/Matrix.js';
import { Cell } from '../../scripts/Cell.js';
import { generateHTML } from '../../scripts/game.js';

describe('Matrix tests', () => {
  it('constructor test', () => {
    let matrix = new Matrix(5, 5, 0);
    expect(matrix.rows).toEqual(5);
    expect(matrix.columns).toEqual(5);
    expect(matrix instanceof Matrix).toEqual(true);
  })

  it('constructor test with invalid matrix size', () => {
    expect(() => new Matrix(0, 5, 0)).toThrowError("Matice musí mít alespoň 1 řádek.");
    expect(() => new Matrix(5, 0, 0)).toThrowError("Matice musí mít alespoň 1 sloupec.");
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

    emptyMatrix = new Matrix(1, 5, 0);
    emptyMatrix.createEmptyMatrix();
    expect(emptyMatrix.matrix.length).toEqual(1);
    expect(emptyMatrix.matrix[0].length).toEqual(5);
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < 5; j++) {
        expect(emptyMatrix.matrix[i][j] instanceof Cell).toEqual(true);
        expect(emptyMatrix.matrix[i][j] instanceof Cell).toEqual(true)
        expect(emptyMatrix.matrix[i][j].adjacentMines).toEqual(0);
        expect(emptyMatrix.matrix[i][j].isMine).toEqual(false);
        expect(emptyMatrix.matrix[i][j].isFlagged).toEqual(false);
        expect(emptyMatrix.matrix[i][j].isRevealed).toEqual(false);
      }
    }
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
    expect(() => new Matrix(5, 5, 25)).toThrowError("Počet min je větší nebo roven počtu políček.");
    expect(() => new Matrix(5, 5, 28)).toThrowError("Počet min je větší nebo roven počtu políček.");
  })

  it('revealCell test', () => {
    const matrix = new Matrix(5, 5, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.fillAdjacentMines();

    expect(matrix.matrix[0][0].isRevealed).toEqual(false);
    matrix.revealCell(0, 0);
    expect(matrix.matrix[0][0].isRevealed).toEqual(true);
    expect(matrix.matrix[1][1].isRevealed).toEqual(false);
    expect(matrix.matrix[2][2].isRevealed).toEqual(false);
    expect(matrix.matrix[4][4].isRevealed).toEqual(false);
    matrix.revealCell(1, 1);
    expect(matrix.matrix[0][0].isRevealed).toEqual(true);
    expect(matrix.matrix[1][1].isRevealed).toEqual(true);
    expect(matrix.matrix[2][2].isRevealed).toEqual(false);
    expect(matrix.matrix[4][4].isRevealed).toEqual(false);

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
    const matrix = new Matrix(4, 4, 1);
    console.log(matrix.matrix[0][1])
    expect(matrix.matrix[0][1].isFlagged).toEqual(false);
    matrix.changeFlagStateOnCell(1, 0);
    expect(matrix.matrix[0][1].isFlagged).toEqual(true);
    matrix.changeFlagStateOnCell(1, 0);
    expect(matrix.matrix[0][1].isFlagged).toEqual(false);
  })
  it('isItSafeToRevealAdjacent test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealCell(1, 1);
    expect(matrix.isItSafeToRevealAdjacent(1, 1)).toEqual(false);
    matrix.changeFlagStateOnCell(0, 0);
    expect(matrix.isItSafeToRevealAdjacent(1, 1)).toEqual(true);
  })
  it('revealAdjacent test', () => {
    const matrix = new Matrix(4, 4, 0);
    matrix.matrix[0][0].insertBomb();
    matrix.fillAdjacentMines();
    matrix.revealCell(1, 1);
    matrix.changeFlagStateOnCell(0, 0);
    matrix.revealAdjacent(1, 1);
    expect(matrix.matrix[0][0].isRevealed).toEqual(false);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        if (i !== 0 && j !== 0) {
          expect(matrix.matrix[j][i].isRevealed).toEqual(true)
        }
      }

    }
  })

});

