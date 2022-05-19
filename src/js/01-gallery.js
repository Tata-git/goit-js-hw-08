import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line

import { galleryItems } from './gallery-items';

// Change code below this line
console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');
console.log(galleryRef);

galleryRef.insertAdjacentHTML('beforeend', galleryElementMarkup(galleryItems));

new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function galleryElementMarkup(images) {
  return images
    .map(({ description, original, preview }) => {
      return `<div class="gallery__item">
      <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>;
	    </div>`;
    })
    .join('');
}
