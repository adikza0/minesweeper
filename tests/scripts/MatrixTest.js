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
    const emptyMatrix = new Matrix(5, 5).createEmptyMatrix();
    expect(emptyMatrix.length).toEqual(5);
    expect(emptyMatrix[0].length).toEqual(5);
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++){
        expect(emptyMatrix[i][j] instanceof Cell).toEqual(true);
        expect(emptyMatrix[i][j] instanceof Cell).toEqual(true)
        expect(emptyMatrix[j][i].adjacentMines).toEqual(0);
        expect(emptyMatrix[j][i].isMine).toEqual(false);
        expect(emptyMatrix[j][i].isFlagged).toEqual(false);
        expect(emptyMatrix[j][i].isRevealed).toEqual(false);
      }
    }
  })

});