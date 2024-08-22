// массив с исходными данными
const initialData = [
  {
    id: 1,
    name: 'Аэробика',
    time: '9:00',
    maxCount: 10,
    currentCount: 0
  },
  {
    id: 2,
    name: 'Йога',
    time: '10:00',
    maxCount: 8,
    currentCount: 0
  },
  {
    id: 3,
    name: 'Зумба',
    time: '11:00',
    maxCount: 10,
    currentCount: 3
  },
  {
    id: 4,
    name: 'Пилатес',
    time: '12:00',
    maxCount: 6,
    currentCount: 0
  },
  {
    id: 5,
    name: 'Калланетика',
    time: '13:00',
    maxCount: 10,
    currentCount: 0
  },
  {
    id: 6,
    name: 'Степ-аэробика',
    time: '14:00',
    maxCount: 12,
    currentCount: 0
  },
  {
    id: 7,
    name: 'Стретчинг',
    time: '17:00',
    maxCount: 8,
    currentCount: 8
  },
  {
    id: 8,
    name: 'Тай-бо',
    time: '18:00',
    maxCount: 10,
    currentCount: 10
  },
  {
    id: 9,
    name: 'Степ-аэробика',
    time: '19:00',
    maxCount: 6,
    currentCount: 5,
  },
  {
    id: 10,
    name: 'Бодифлекс',
    time: '20:00',
    maxCount: 14,
    currentCount: 10,
  }
];
localStorage.clear();
// Преобразование массива объектов в строку и запись исходных данных в Local Storage
localStorage.setItem('classesData', JSON.stringify(initialData));

// находим необходимые элементы на странице
const classList = document.querySelector('.classes-list');

// функция отображения расписания занятий
function displayAllClasses() {
  const data = JSON.parse(localStorage.getItem('classesData')); // забираем данные из local storage
  classList.innerHTML = '';
  data.forEach(element => {
     // создаём элемент списка
    const listItem = document.createElement('li');
    listItem.classList.add('list-item'); 
    if (element.currentCount < element.maxCount) {
      listItem.innerHTML = `
    <h2 class="class-name">${element.name}</h2>
    <p class="class class-time">Время проведения занятия: <span class="value time">${element.time}</span></p>
    <p class="class class-max">Максимальное количество участников: <span class="value max-count">${element.maxCount}</span></p>
    <p class="class class-current">Текущее количество участников: <span class="value current-count">${element.currentCount}</span></p>
    <button class="button button-sign button-sign active">Записаться на занятие</button>
    <button class="button button-cancel active">Отменить запись</button>`;
    }
    if (element.currentCount >= element.maxCount) {
      listItem.innerHTML = `
      <h2 class="class-name">${element.name}</h2>
      <p class="class class-time">Время проведения занятия: <span class="value time">${element.time}</span></p>
      <p class="class class-max">Максимальное количество участников: <span class="value max-count">${element.maxCount}</span></p>
      <p class="class class-current">Текущее количество участников: <span class="value current-count">${element.currentCount}</span></p>
      <button disabled class="button button-sign button-sign inactive">Записаться на занятие</button>
      <button class="button button-cancel active">Отменить запись</button>`;
    }
    if (element.currentCount == 0) {
      listItem.innerHTML = `
      <h2 class="class-name">${element.name}</h2>
      <p class="class class-time">Время проведения занятия: <span class="value time">${element.time}</span></p>
      <p class="class class-max">Максимальное количество участников: <span class="value max-count">${element.maxCount}</span></p>
      <p class="class class-current">Текущее количество участников: <span class="value current-count">${element.currentCount}</span></p>
      <button class="button button-sign button-sign active">Записаться на занятие</button>
      <button disabled class="button button-cancel inactive">Отменить запись</button>`;
    }
    classList.append(listItem); // добавляем элемент списка занятий
  });
}
// функция для записи на занятие
function signUpClass(name) {
  const data = JSON.parse(localStorage.getItem('classesData')); // забираем данные из local storage
  localStorage.clear();
  data.forEach(element => {
    if (element.name === name) {
      element.currentCount += 1;
    }
  });
  localStorage.setItem('classesData',JSON.stringify(data));
}
// функция для отмены записи на занятие
function cancelClass(name) {
  const data = JSON.parse(localStorage.getItem('classesData')); // забираем данные из local storage
  localStorage.clear();
  data.forEach(element => {
    if (element.name === name) {
      element.currentCount -= 1;
    }
  });
  localStorage.setItem('classesData',JSON.stringify(data));
}


displayAllClasses();
// обработчик клика для кнопок записи на занятие и отмены записи
classList.addEventListener('click', event => {
if (event.target.classList.contains('button-sign')) {
  const findElement = event.target.closest('li');
  const classNameEl = findElement.querySelector('h2');
  signUpClass(classNameEl.textContent);
  displayAllClasses();
}
if (event.target.classList.contains('button-cancel')) {
  const findElement = event.target.closest('li');
  const classNameEl = findElement.querySelector('h2');
  cancelClass(classNameEl.textContent);
  displayAllClasses();
}
});
