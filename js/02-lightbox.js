import { galleryItems } from "./gallery-items.js";
// Change code below this line

const picElements = document.querySelector(".gallery");

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li style="margin-top: 60px" "class="gallary__item">
    <a class="gallary__link" href="${original}">
    <img width="370" height="240"  class="gallary__image" src="${preview}" alt="${description}">
    </a></li>`;
  })
  .join("");

picElements.innerHTML = markup;

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "description",
  caption: true,
  captionDelay: 250,
  captionSpeed: 250,
  close: false,
  enableKeyboard: true,
  captions: true,
  captionPosition: "bottom",
  captionAlign: "center",
  captionEffect: "fade",
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
