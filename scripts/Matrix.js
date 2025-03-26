import { Cell } from './Cell.js';
export class Matrix {
  rows;
  columns;
  bombCount;
  matrix;
  constructor(rows, columns, bombCount) {
    if (rows < 1) {
      throw new Error("Matice musí mít alespoň 1 řádek.");
    }
    if (columns < 1) {
      throw new Error("Matice musí mít alespoň 1 sloupec.");
    }
    this.rows = rows;
    this.columns = columns;
    this.bombCount = bombCount;
    this.generateMatrix(bombCount);

  }
  generateMatrix() {
    this.createEmptyMatrix();
    this.generateBombs();
  }
  createEmptyMatrix() {
    const emptyMatrix = [];
    for (let i = 0; i < this.rows; i++) {
      emptyMatrix.push([]);
      for (let j = 0; j < this.columns; j++) {
        emptyMatrix[i].push(new Cell());
      }

    }
    this.matrix = emptyMatrix;
  }

  generateBombs() {
    let x;
    let y;
    for (let i = 0; i < this.bombCount; i++) {
      [x, y] = this.generateRandomPosition();

      while (this.matrix[y][x].isMine) {
        [x, y] = this.generateRandomPosition();
      }
      this.matrix[y][x].insertBomb();
    }
  }

  returnRemainingBombCount() {
    let bombCount = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.matrix[i][j].isMine) {
          bombCount++;
        }
      }
    }
    return bombCount;
  }

  generateRandomPosition() {
    return [Math.floor(Math.random() * this.columns), Math.floor(Math.random() * this.rows)];
  }

  doesCellExist(x, y) {
    if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
      return false;
    }
    return true;
  }

  countAdjacentMines(x, y) {
    let adjacentMines = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.doesCellExist(x + i, y + j)) {
          if (i === 0 && j === 0) continue;
          if (this.matrix[y + j][x + i].isMine) {
            adjacentMines++;
          }
        }
      }
    }
    return adjacentMines;
  }

  fillAdjacentMines(){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j].adjacentMines = this.countAdjacentMines(j, i);
      }
    }
  }
}
