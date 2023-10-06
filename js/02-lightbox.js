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
  captionsData: "alt",
  captionDelay: 300,
  captionSpeed: 250,
  // close: false,
  closeText: "closeMe",
  captionPosition: "bottom",
  captionAlign: "left",
  captionEffect: "fade",
  navText: ["❤️", "💕"],
  captionType: "type",
  swipeClose: true,
});
