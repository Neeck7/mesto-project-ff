import "./pages/index.css";
import {
  createCard,
  deleteCardFunc,
  setLikeCounter,
  isLiked,
  activateLike,
  deactivateLike,
} from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation.js";
import {
  profileData,
  initialCards,
  editProfileApi,
  newCardApi,
  deleteCardApi,
  editAvatarApi,
  likeCardApi,
  dislikeCardApi,
} from "./scripts/api.js";

const placesList = document.querySelector(".places__list");
const popupList = document.querySelectorAll(".popup");

// кнопки вызова попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileImgEditButton = document.querySelector(".profile__image");

// попапы редактирования, добавления и удаления карточки
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const popupAvatarEdit = document.querySelector(".popup_type_edit-img");

const deleteCardButton = document.querySelector(
  ".popup_type_delete-card__button"
);

// попап с картинкой и элементы
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImg = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// форма добавления карточки и элементы
const formAddCards = document.forms.newPlace;
const placeInput = formAddCards.elements.placeName;
const linkInput = formAddCards.elements.link;

// форма редактирования и элементы
const formEditProfile = document.forms.editProfile;
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

// форма обновления аватара
const formEditAvatar = document.forms.editProfileAvatar;
const avatarLinkInput = formEditAvatar.elements.avatar;

// элементы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

let userId = null;
let idCardForDelete = null;
let cardForDelete = null;

enableValidation(validationConfig);

// Создает карточки и загружаем UserInfo
Promise.all([profileData(), initialCards()])
  .then(([userData, cards]) => {
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userId = userData._id;
    cards.forEach(function (cardData) {
      const currentCard = createCard(
        cardData,
        handleDeleteCard,
        openCardFunc,
        handleLikeCard,
        userId
      );
      placesList.append(currentCard);
    });
  })
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен", err);
  }); // если что-то не так

// открывает попап с картинкой
function openCardFunc({ name, link }) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

// сохраняет новую карточку
function handleImgSubmit(evt) {
  evt.preventDefault();
  savingButtonText(popupNewCard);
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value,
  };

  newCardApi(newCardData)
    .then((res) => {
      const newCard = createCard(
        res,
        handleDeleteCard,
        openCardFunc,
        handleLikeCard,
        userId
      );
      placesList.prepend(newCard);
      formAddCards.reset();
      closeModal(popupNewCard);
      saveButtonText(popupNewCard);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
    })
    .finally(() => {
      saveButtonText(popupNewCard);
    });
}

formAddCards.addEventListener("submit", handleImgSubmit);

// слушатель на кнопке "добавить картинку"
profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
  clearValidation(formAddCards, validationConfig);
});

// открывает модалку редактирования аватара
profileImgEditButton.addEventListener("click", () => {
  openModal(popupAvatarEdit);
  clearValidation(formEditAvatar, validationConfig);
});

// редактирование аватарки
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  savingButtonText(popupAvatarEdit);
  const profileAvatarLink = { avatar: avatarLinkInput.value };
  editAvatarApi(profileAvatarLink)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupAvatarEdit);
      saveButtonText(popupAvatarEdit);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
    })
    .finally(() => {
      saveButtonText(popupAvatarEdit);
    });
}

formEditAvatar.addEventListener("submit", handleAvatarSubmit);

// сохраняет введенные данные
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  savingButtonText(popupEdit);

  const dataEditForm = {
    name: nameProfileInput.value,
    about: jobProfileInput.value,
  };
  editProfileApi(dataEditForm)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .then(() => {
      closeModal(popupEdit);
      saveButtonText(popupEdit);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
    })
    .finally(() => {
      saveButtonText(popupEdit);
    });
}

formEditProfile.addEventListener("submit", handleFormEditSubmit);

// вбивает данные со страницы в попап
profileEditButton.addEventListener("click", () => {
  openModal(popupEdit);
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
});

// закрывает попап кликом
popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closeModal(popup);
    }
  });
});

// Слушатель на подтверждение удаления карточки
deleteCardButton.addEventListener("click", () => {
  deleteCardApi(idCardForDelete)
    .then(() => {
      deleteCardFunc(cardForDelete);
      closeModal(popupDeleteCard);
      idCardForDelete = null;
      cardForDelete = null;
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен", err);
    });
});

// Инициализация удаления карточки
function handleDeleteCard(cardElement, cardId) {
  idCardForDelete = cardId;
  cardForDelete = cardElement;
  openModal(popupDeleteCard);
}

// Обработка нажатия кнопки Like
function handleLikeCard(cardId, cardLikeButton, cardLikeCount) {
  const handleLike = isLiked(cardLikeButton);

  const res_promise = handleLike ? dislikeCardApi(cardId) : likeCardApi(cardId);
  res_promise
    .then((res) => {
      if (handleLike) {
        deactivateLike(cardLikeButton);
      } else {
        activateLike(cardLikeButton);
      }
      setLikeCounter(cardLikeCount, res.likes.length);
    })
    .catch((err) => {
      console.error("Ошибка при изменении лайка:", err);
    });
}

//меняем текст кнопки сохранения
const savingButtonText = (element) => {
  element.querySelector(".popup__button").textContent = "Сохранение...";
};

const saveButtonText = (element) => {
  element.querySelector(".popup__button").textContent = "Сохранить";
};
