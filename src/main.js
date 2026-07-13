import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  showLoader,
  hideLoader,
  createGallery,
} from './js/render-functions.js';
import 'pure-css-loader/dist/css-loader.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const fetchPostsBtn = document.querySelector('.fetchPostsBtn');
const switcher = document.querySelector('.switch input');
const upBtn = document.querySelector('.up-btn');

let page = 1;
let perPage = 15;
let query = '';

form.addEventListener('submit', async e => {
  e.preventDefault();
  clearGallery(gallery);

  const formData = new FormData(e.currentTarget);
  query = formData.get('search-text').trim();

  e.currentTarget.reset();

  if (query === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Search field cannot be empty!',
      position: 'topRight',
    });
    return;
  }

  clearGallery(gallery);
  page = 1;
  fetchPostsBtn.style.display = 'none';

  e.currentTarget.reset();
  showLoader(loader);

  try {
    const data = await getImagesByQuery(query, page, perPage);

    if (!data.hits.length) {
      iziToast.warning({
        title: 'Caution',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits, gallery);

    fetchPostsBtn.style.display = 'flex';

    if (data.totalHits > page * perPage) {
      fetchPostsBtn.style.display = 'flex';
    }
  } catch (error) {
    console.log(error);
    iziToast.error({ title: 'Error', message: 'Something went wrong!' });
  } finally {
    hideLoader(loader);
  }
});

fetchPostsBtn.addEventListener('click', async () => {
  page += 1;
  showLoader(loader);
  fetchPostsBtn.style.display = 'none';

  try {
    const data = await getImagesByQuery(query, page, perPage);

    createGallery(data.hits, gallery);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (data.totalHits > page * perPage) {
      fetchPostsBtn.style.display = 'flex';
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader(loader);
  }
});

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
