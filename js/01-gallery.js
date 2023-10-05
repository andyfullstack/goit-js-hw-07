import { galleryItems } from "./gallery-items.js";
// Change code below this line

const picElements = document.querySelector(".gallery");
const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li style="margin: 10px" class="gallery__item">
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
        //    instance.element().querySelector("a").onclick = instance.close;
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
