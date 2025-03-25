import {Cell} from './Cell.js';
export class Matrix {
  rows;
  columns;
  matrix;
  constructor(rows, columns) {
    if (rows < 1) {
      throw new Error("Matice musí mít alespoň 1 řádek.");
    }
    if (columns < 1) {
      throw new Error("Matice musí mít alespoň 1 sloupec.");
    } 
    this.rows = rows;
    this.columns = columns;
    this.matrix = this.createEmptyMatrix();
  }

  createEmptyMatrix(){
    const emptyMatrix = [];
    for(let i = 0; i < this.rows; i++){
      emptyMatrix.push([]);
      for(let j = 0; j < this.columns; j++){
        emptyMatrix[i].push(new Cell());
      }
    }
    return emptyMatrix;
  }
}

const matrix = new Matrix(5, 5);
console.log(matrix);