import { galleryItems } from "./gallery-items.js";
// Change code below this line

const picElements = document.querySelector(".gallery");

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallary__item">
    <a class="gallary__link" href="${original}">
    <img class="gallary__image" src="${preview}" alt="${description}">
    </a></li>`;
  })
  .join("");

picElements.insertAdjacentHTML("beforebegin", markup);

// console.log(galleryItems);

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  close: false,
  enableKeyboard: true,
});

const modalOpen = evt => {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const clickedImageAlt = evt.target.getAttribute("alt");
  const clickedImageSrc = evt.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src='${clickedImageSrc}' alt='${clickedImageAlt}'/>`,
    {
      onShow: instance => {
        document.addEventListener("keydown", modalClose);
      },
      onClose: instance => {
        document.removeEventListener("keydown", modalClose);
        instance = null;
      },
    }
  );
  instance.show();
};
const modalClose = evt => {
  if (evt.key !== "Escape") {
    return;
  } else {
    instance.close();
  }
};
//   if (evt.key === "Escape" && modalOpen()) {
//     instance.close();
//     modalClose = true;
//   }
// };

document.addEventListener("keydown", modalClose);
picElements.addEventListener("click", evt => {
  modalOpen(evt);
});
