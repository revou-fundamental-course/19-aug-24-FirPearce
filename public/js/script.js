document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".carousel_container");
  const items = document.querySelectorAll(".carousel_item");
  const totalItems = items.length;
  let index = 0;

  const updateCarousel = () => {
    container.style.transform = `translateX(-${index * 100}%)`;
  };

  document
    .querySelector(".carousel_button--left")
    .addEventListener("click", () => {
      index = index > 0 ? index - 1 : totalItems - 1;
      updateCarousel();
    });

  document
    .querySelector(".carousel_button--right")
    .addEventListener("click", () => {
      index = index < totalItems - 1 ? index + 1 : 0;
      updateCarousel();
    });
});
