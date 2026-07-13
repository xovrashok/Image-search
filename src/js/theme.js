const switcher = document.querySelector('.switch input');

function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;

  const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
  return userMedia.matches ? 'dark' : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  let switcherInput = document.querySelector('.switch input');

  if (switcherInput) {
    switcherInput.checked = theme === 'dark';
  }
}

let currentTheme = getInitialTheme();
setTheme(currentTheme);

switcher.addEventListener('change', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(currentTheme);
});
