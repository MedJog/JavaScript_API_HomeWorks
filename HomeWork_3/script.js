// получаем элементы
const apiKey = "2xe7uzDwXdzjKl50IEY7vhkyE3wSvlEkA3KrISJO8-A";
const newApiKey = "A6akofLUwR5WIirre3xSeD68RY3i-rZ-WWCUDA4NKbE";

const photoElement = document.querySelector(".img");
const autorPhoto = document.querySelector(".autor-name");
const likeCount = document.querySelector(".like-count");
const yourLikeCount = document.querySelector(".your-like-count");
const historyElement = document.querySelector(".history");
const likeButton = document.querySelector(".button-like");
const previousPhotosButton = document.querySelector(".button-previous");

// класс фото
class Photo {
  constructor(autor, url, like) {
    this.autor = autor;
    this.url = url;
    this.like = like;
  }
}
// Функция для получения случайного изображения
async function getRandomPhoto() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${newApiKey}`
    );
    const photo = await response.json();
    return photo;
  } catch (error) {
    console.error("Ошибка при загрузке фотографий: ", error);
    return [];
  }
}
// Функция показа фото
async function displayPhoto(photo) {
  const photoForHistory = new Photo(photo.user.name, photo.urls.small, photo.likes);
  photoElement.src = photoForHistory.url;
  autorPhoto.textContent = photoForHistory.autor;
  likeCount.textContent = photoForHistory.like;
  yourLikeCount.textContent = parseInt(localStorage.getItem("likes")) || 0;
  addPhotoToHistory(photoForHistory);
}

// Функция для добавления фото в историю
function addPhotoToHistory(photoForHistory) {
  if (localStorage.getItem("historyPhotos") === null) {
    historyPhotos = [];
  } else {
      historyPhotos = (JSON.parse(localStorage.getItem("historyPhotos")));
  }
  historyPhotos.push(photoForHistory);
  localStorage.setItem('historyPhotos', JSON.stringify(historyPhotos));
}
// Функция для показа истории просмотра предыдущих фото
function displayHistory() {
  const historyPhotos = (JSON.parse(localStorage.getItem("historyPhotos")));
  if (historyPhotos.length <= 1) {
    const messageEl = document.createElement('p');
    messageEl.classList.add('message');
    messageEl.textContent = 'История просмотра пуста';
    historyElement.appendChild(messageEl);
    historyElement.style.display = "flex";
  } else {
    historyPhotos.forEach(photo => {
      const photoDiv = document.createElement("div");
      photoDiv.classList.add('history-photo');
      photoDiv.innerHTML = `
          <img class="img" src="${photo.url}" alt="Фото дня"/>
          <p class="autor">Фотограф: <span class="autor-name">${photo.autor}</span></p>
          <p class="like">Это фото понравилось <span class="like-count">${photo.like}</span> людям.</p>`;
      historyElement.appendChild(photoDiv);
      historyElement.style.display = "flex";
  });
}
}
// Функция для обновления счетчика лайков
function updateYourLikes() {
  let likes = parseInt(localStorage.getItem("likes")) || 0;
  likes += 1;
  localStorage.setItem("likes", likes);
  yourLikeCount.textContent = likes;
}

// Инициализация приложения
async function init() {
  const photo = await getRandomPhoto();
  displayPhoto(photo);
  likeButton.addEventListener("click", updateYourLikes);
 
  previousPhotosButton.addEventListener("click", displayHistory);
}

init();
