export function cardDelete(placesItem) {
  placesItem.remove();
}

// Обработчик лайка
export function handleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}


// Функция создания карточки
export function createCard(cardData, { cardDelete, handleLike, ImageClick }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  const likeButton = placesItem.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  placesItem.querySelector('.card__title').textContent = cardData.name;

  // Удаление
  placesItem.querySelector('.card__delete-button')
    .addEventListener('click', () => cardDelete(placesItem));

  likeButton.addEventListener('click', () => handleLike(likeButton));
  cardImage.addEventListener('click', () => ImageClick(cardData));

  return placesItem;
}


