function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", EscClose);
}

function EscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", EscClose);
}

export { openModal, closeModal };
