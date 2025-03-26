import {Matrix} from '../../scripts/Matrix.js';
import {Cell} from '../../scripts/Cell.js';

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
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++){
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
    for(let i = 0; i < 1; i++){
      for(let j = 0; j < 5; j++){
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
    for(let i = 0; i < 20; i++){
      let position = matrix.generateRandomPosition();
      expect(position[0]).toBeGreaterThanOrEqual(0);
      expect(position[0]).toBeLessThan(5);
      expect(position[1]).toBeGreaterThanOrEqual(0);
      expect(position[1]).toBeLessThan(5);
    }
  })

  it('generateBombs test with square matrix',() => {
    const matrix = new Matrix(5, 5, 5);
    let bombCount = 0;
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++){
        if(matrix.matrix[i][j].isMine){
          bombCount++;
        }
      }
    }
    expect(bombCount).toEqual(5);
  })

  it('generateBombs test with rectangle matrix',() => {
    const matrix = new Matrix(10, 5, 10);
    let bombCount = 0;
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 5; j++){
        if(matrix.matrix[i][j].isMine){
          bombCount++;
        }
      }
    }
    expect(bombCount).toEqual(10);
  })

  it('returnRemainingBombCount test', () => {
    let matrix;

    matrix = new Matrix(5, 5, 5);
    expect(matrix.returnRemainingBombCount()).toEqual(5);

    matrix = new Matrix(2, 6, 8);
    expect(matrix.returnRemainingBombCount()).toEqual(8);

    matrix = new Matrix(5, 12, 20);
    expect(matrix.returnRemainingBombCount()).toEqual(20);
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

});