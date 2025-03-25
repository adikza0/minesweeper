import {Matrix} from '../../scripts/Matrix.js';

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

  it('generateEmptyMatrix test', () => {

  })

});