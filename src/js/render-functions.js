import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function clearGallery(container) {
  container.innerHTML = '';
}

export function showLoader(loaderElement) {
  loaderElement.classList.add('is-active');
}

export function hideLoader(loaderElement) {
  loaderElement.classList.remove('is-active');
}

export function createGallery(images, container) {
  const markup = images
    .map(image => {
      return `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="info-container">
          <div class="info-block"><span class="info-title">Likes</span><span class="info-value">${image.likes}</span></div>
          <div class="info-block"><span class="info-title">Views</span><span class="info-value">${image.views}</span></div>
          <div class="info-block"><span class="info-title">Comments</span><span class="info-value">${image.comments}</span></div>
          <div class="info-block"><span class="info-title">Downloads</span><span class="info-value">${image.downloads}</span></div>
        </div>
      </li>`;
    })
    .join('');

  container.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
