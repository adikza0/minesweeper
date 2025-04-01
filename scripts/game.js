import { Matrix } from './Matrix.js';

const matrix = new Matrix(4, 4, 0);
matrix.matrix[0][0].insertBomb();
matrix.fillAdjacentMines();
matrix.changeFlagStateOnCell(0,0);
matrix.changeFlagStateOnCell(0, 1);
matrix.revealCell(3,3);
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
        } else {
          if (matrix.matrix[i][j].adjacentMines === 0) {
            content = ''
          } else {
            content = matrix.matrix[i][j].adjacentMines;
          }
        }
      } else {
        if (matrix.matrix[i][j].isFlagged) {
          content = '🚩';
        } else {
          content = '';
        }
      }
      gameHTML += `<div class="cell${matrix.matrix[i][j].isRevealed ? ' revealed' : ''}" data-x="${j}" data-y="${i}">${content}</div>`;
    }
    gameHTML += '</div>';
  }
  document.querySelector('.js-game-container').innerHTML = gameHTML;
  addEventListeners();
};


function addEventListeners(){
  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', cell => {
      const x = parseInt(cell.target.dataset.x);
      const y = parseInt(cell.target.dataset.y);
      matrix.revealCell(x, y);
      generateHTML(matrix);
    })

    cell.addEventListener('contextmenu', cell => {
      const x = parseInt(cell.target.dataset.x);
      const y = parseInt(cell.target.dataset.y);
      if (!matrix.matrix[y][x].isRevealed) {
        matrix.changeFlagStateOnCell(x, y);
        generateHTML(matrix);
      }
    })
  })
}