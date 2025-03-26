import { Matrix } from './Matrix.js';

const testMatrix = new Matrix(5, 10, 5);
generateHTML(testMatrix);


export function generateHTML(matrix) {
  let gameHTML = '';
  for (let i = 0; i < matrix.rows; i++) {
    gameHTML += '<div class="row">';
    for (let j = 0; j < matrix.columns; j++) {
      let content = '';
      if (matrix.matrix[i][j].isRevealed) {
        if (matrix.matrix[i][j].isMine) {
          content = '💣';
        }
        else {
          content = matrix.matrix[i][j].adjacentMines;
        }
      }
      gameHTML += `<div class="cell" data-x="${j}" data-y="${i}">${content}</div>`;
    }
    gameHTML += '</div>';
  }
  document.querySelector('.js-game-container').innerHTML = gameHTML;
};