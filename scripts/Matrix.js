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
    this.matrix= [];
    //this.matrix = this.createEmptyMatrix();
  }

  createEmptyMatrix(){
    const emptyMatrix = [];
    for(let i = 0; i < this.rows; i++){
      emptyMatrix.push([]);
      for(let j = 0; j < this.columns; j++){
        emptyMatrix[i].push(new Cell());
      }
    
    }
    this.matrix = emptyMatrix;
  }

  generateBombs(bombCount){
    let x;
    let y;
    for (let i = 0; i < bombCount; i++) {
      [x, y] = this.generateRandomPosition();
      console.log(x);
      console.log(y);
      console.log(this.matrix[y][x]);
      while (this.matrix[y][x].isMine) {
        [x, y] = this.generateRandomPosition();
      }
      this.matrix[y][x].insertBomb();
    }
  }

  generateRandomPosition(){
    return [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
  }

}
