const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-38/",
  headers: {
    authorization: "876e3de4-4442-4286-83e5-5c1ffc2cb0cf",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const profileData = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  }).then(handleResponse);
};

export const initialCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  }).then(handleResponse);
};

export const editProfileApi = (userData) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(userData),
  }).then(handleResponse);
};

export const newCardApi = (dataCard) => {
  console.log("request", JSON.stringify(dataCard));
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(dataCard),
  }).then(handleResponse);
};

export const deleteCardApi = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  }).then(handleResponse);
};

export const likeCardApi = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
    body: JSON.stringify(),
  }).then(handleResponse);
};

export const dislikeCardApi = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  }).then(handleResponse);
};

export const editAvatarApi = (avatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(avatar),
  }).then(handleResponse);
};
