const upBtn = document.querySelector('.up-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    upBtn.classList.add('is-visible');
  } else {
    upBtn.classList.remove('is-visible');
  }
});

upBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
