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

form.addEventListener('submit', async e => {
  e.preventDefault();
  clearGallery(gallery);

  const formData = new FormData(e.currentTarget);

  const text = formData.get('search-text').trim();

  e.currentTarget.reset();

  if (text === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Search field cannot be empty!',
      position: 'topRight',
    });
    return;
  }

  showLoader(loader);

  try {
    const images = await getImagesByQuery(text);

    if (!images.length) {
      iziToast.warning({
        title: 'Caution',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(images, gallery);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader(loader);
  }
});
