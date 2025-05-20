document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.js-play-button').addEventListener('click', (e) => {
      e.preventDefault(); // ✅ This stops the form from submitting and reloading
  
      let rows = document.querySelector('.js-rows-input').value;
      let columns = document.querySelector('.js-columns-input').value;
      let mines = document.querySelector('.js-mines-input').value;
  
      if (rows >= 5 && columns >= 5 && mines >= 1) {
        window.location.href = `game.html?mines=${mines}&rows=${rows}&columns=${columns}`;
      }
    });
  });
  // === theme‑toggle script ===
    const themeToggle = document.getElementById('theme-toggle');
    // apply saved theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.checked = true;
    }
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });