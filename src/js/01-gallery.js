import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const galleryList = document.querySelector('.gallery');
const galleryMarkup = galleryItems
    .map(({preview, original, description}) => {
        return `<li class="gallery__item">
        <a class="gallery__link" href="large-image.jpg">
          <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt=${description}
          />
        </a>
      </li>`;
    })
    .join ('');

galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);
galleryList.addEventListener('click', openModal);

function openModal(event) {
    event.preventDefault();
    if (event.target === event.currentTarget) return;
    const instance = basicLightbox.create(
        `<img class = "gallery__image" src = "${event.target.dataset.source}"/>`,
        {
            onShow: instance => {
              document.addEventListener('keydown', closeModalEsc);
            },
            onClose: instance => {
              document.removeEventListener('keydown', closeModalEsc);
            },
          },
    );
    instance.show();

    function closeModalEsc(event) {
        if (event.code !== 'Escape') return;
        instance.close();
    }
}
