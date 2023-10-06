import { galleryItems } from "./gallery-items.js";
// Change code below this line

const picElements = document.querySelector(".gallery");
const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li style="margin: 30px"  class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                loading="lazy"
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;
  })
  .join("");
picElements.insertAdjacentHTML("beforeend", markup);
let instance = null;

const modalOpen = evt => {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const clickedImageAlt = evt.target.getAttribute("alt");
  const clickedImageSrc = evt.target.dataset.source;

  instance = basicLightbox.create(
    `<img src='${clickedImageSrc}' alt='${clickedImageAlt}'/>`,
    {
      onShow: () => {
        document.addEventListener("keydown", modalClose);
      },
      onClose: () => {
        document.removeEventListener("keydown", modalClose);
      },
    }
  );
  instance.show();
};

const modalClose = evt => {
  if (evt.key !== "Escape") return;

  instance.close();
};

picElements.addEventListener("click", modalOpen);

// let modalIsOpen = false;
// let modal;
// function onImageClick(event) {
//   event.preventDefault();
//   const target = event.target;

//   if (target.classList.contains("gallery__image")) {
//     const originalImageUrl = target.dataset.source;
//     modal = basicLightbox.create(
//       `<img src="${originalImageUrl}" width="800" height="600"> `
//     );
//     modal.show();
//     modalIsOpen = true;
//   }
//   document.addEventListener("keydown", keyDown);
// }

// function keyDown(event) {
//   if (event.key === "Escape" && modalIsOpen) {
//     modal.close();
//     modalIsOpen = false;
//     document.removeEventListener("keydown", keyDown);
//   }
// }
