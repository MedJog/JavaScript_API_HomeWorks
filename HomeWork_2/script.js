// находим элементы
const slideContainer = document.querySelector(".container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const indicatorsContainer = document.querySelector(".indicators");

const slides = Array.from(slideContainer.querySelectorAll(".img"));
const indicators = Array.from(
  indicatorsContainer.querySelectorAll(".indicator")
);

const slideCount = slides.length;
let slideIndex = 0;

// функция показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}
// функция показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}
// обновление слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      indicators[index].classList.add("active");
      slide.classList.remove("hidden"); // показать слайд
    } else {
      slide.classList.add("hidden"); // убрать слайд
      indicators[index].classList.remove("active");
    }
  });
}
// обработчики событий на кнопки
prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
indicatorsContainer.addEventListener('click', event => {
  if (event.target.classList.contains('indicator')) {
    const findIndicator = event.target.closest('div');
    slideIndex = indicators.indexOf(findIndicator);
    updateSlider();
  }
});

// инициализация слайдера
updateSlider();
