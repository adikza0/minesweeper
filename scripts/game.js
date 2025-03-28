import { Matrix } from './Matrix.js';

const matrix = new Matrix(4, 4, 0);
matrix.matrix[0][0].insertBomb();
matrix.matrix[0][1].insertBomb();
matrix.fillAdjacentMines();

generateHTML(matrix);


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
          if (content === 0) {
            content = '';
          }
        }
      }
      gameHTML += `<div class="cell${matrix.matrix[i][j].isRevealed ? ' revealed' : ''}" data-x="${j}" data-y="${i}">${content}</div>`;
    }
    gameHTML += '</div>';
  }
  document.querySelector('.js-game-container').innerHTML = gameHTML;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', cell => {
      const x = cell.target.dataset.x;
      const y = cell.target.dataset.y;
      matrix.revealCell(x, y);
      generateHTML(matrix);
    })
  })
};