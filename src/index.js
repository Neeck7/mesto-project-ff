import './index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, cardDelete, handleLike} from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';

// профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// кнопки
const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

// попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const addCardForm = popupNewCard.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

// форма редактирования профиля
const profileFormElement = popupEdit.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// просмотр изображения
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Список карточек
const placesList = document.querySelector('.places__list');

// Обработчик клика по изображению карточки
const ImageClick = (cardData) => {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
};



// Создание карточки
function renderCard(cardData) {
  const card = createCard(cardData, {
    cardDelete,
    handleLike,
    ImageClick
  });
  placesList.append(card);
}

// Инициализация стартовых карточек
initialCards.forEach(renderCard);

// Открытие попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

// Обработка отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Открытие попапа добавления карточки
addCardBtn.addEventListener('click', () => openModal(popupNewCard));

// Закрытие попапов
const modals = document.querySelectorAll('.popup');
modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('popup') ||
      event.target.classList.contains('popup__close')
    ) {
      closeModal(modal);
    }
  });
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  const newCard = createCard(newCardData, {
    cardDelete,
    handleLike,
    ImageClick
  });

  // Добавление карточки в начало списка
  placesList.prepend(newCard);
  addCardForm.reset();
  closeModal(popupNewCard);
}

addCardForm.addEventListener('submit', handleAddCardSubmit);

