import {Matrix} from '../../scripts/Matrix.js';
import {Cell} from '../../scripts/Cell.js';

describe('Matrix tests', () => {
  it('constructor test', () => {
    let matrix = new Matrix(5, 5);
    expect(matrix.rows).toEqual(5);
    expect(matrix.columns).toEqual(5);
    expect(matrix instanceof Matrix).toEqual(true);
  })
  
  it('constructor test with invalid matrix size', () => {
    expect(() => new Matrix(0, 5)).toThrowError("Matice musí mít alespoň 1 řádek.");
    expect(() => new Matrix(5, 0)).toThrowError("Matice musí mít alespoň 1 sloupec.");
  })

  it('createEmptyMatrix test', () => {
    let emptyMatrix = new Matrix(5, 5);
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

    emptyMatrix = new Matrix(1, 5);
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
    const matrix = new Matrix(5,5);
    for(let i = 0; i < 20; i++){
      let position = matrix.generateRandomPosition();
      expect(position[0]).toBeGreaterThanOrEqual(0);
      expect(position[0]).toBeLessThan(5);
      expect(position[1]).toBeGreaterThanOrEqual(0);
      expect(position[1]).toBeLessThan(5);
    }
  })

  it('generateBombs test',() => {
    const matrix = new Matrix(5,5);
    matrix.createEmptyMatrix();
    matrix.generateBombs(5);
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

});