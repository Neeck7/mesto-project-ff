const cardTemplate = document.querySelector("#card-template").content;
function createCard(cardData, clickDelete, clickImg, clickLike, userId) {
  const placesItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = placesItem.querySelector(".card__delete-button");
  const cardLikeButton = placesItem.querySelector(".card__like-button");

  const cardTitle = placesItem.querySelector(".card__title");
  const cardImage = placesItem.querySelector(".card__image");
  const cardLikeCount = placesItem.querySelector(".card__like-counter");
  const cardId = cardData._id;

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

  const handleLike = cardData.likes
    .map(function (likeObj) {
      return likeObj._id;
    })
    .includes(userId);
  if (handleLike) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  const allowDelete = userId == cardData.owner._id;
  if (allowDelete) {
    deleteButton.classList.add("card__delete-button-active");
  }

  deleteButton.addEventListener("click", () => clickDelete(placesItem, cardId));
  cardImage.addEventListener("click", () =>
    clickImg({ name: cardData.name, link: cardData.link })
  );
  cardLikeButton.addEventListener("click", () =>
    clickLike(cardId, cardLikeButton, cardLikeCount)
  );

  return placesItem;
}

// меняет состояние кнопки лайка
// function downLike(cardLike) {
//   const targetClass = "card__like-button_is-active";
//   cardLike.classList.toggle(targetClass);
//   // Возвращает true если кнопка активна, иначе false
//   return cardLike.classList.contains("card__like-button_is-active");
// }


// Проверяет, был ли лайк на карточке
export function isLiked(cardLikeButton) {
  return cardLikeButton.classList.contains("card__like-button_is-active");
}

// Ставит лайк 
function activateLike(cardLikeButton) {
  cardLikeButton.classList.add("card__like-button_is-active");
}

// Убирает лайк 
function deactivateLike(cardLikeButton) {
  cardLikeButton.classList.remove("card__like-button_is-active");
}

// меняет счетчик лайков
function setLikeCounter(cardLikeCount, likesNum) {
  cardLikeCount.textContent = likesNum;
}

//  удаление карточки с формы
function deleteCardFunc(cardElement) {
  cardElement.remove();
}

export { createCard, deleteCardFunc,  setLikeCounter, activateLike, deactivateLike};
