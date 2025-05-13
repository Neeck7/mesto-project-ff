const addCard = (card, deleteCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesItem.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  placesItem.querySelector('.card__title').textContent = card.name;
  placesItem.querySelector('.card__delete-button')
    .addEventListener('click', () => deleteCard(placesItem));

  return placesItem;
};

const deleteCard = (placesItem) => {
  placesItem.remove();
};

const placesList = document.querySelector('.places__list');

initialCards.forEach((card) => {
  const cardElement = addCard(card, deleteCard);
  placesList.append(cardElement);
});