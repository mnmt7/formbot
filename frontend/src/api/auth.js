const BACKEND_URL = "http://localhost:3000/api/v1";

export const login = async (data) => {
  const response = await fetch(`${BACKEND_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  localStorage.setItem("token", resData.token);

  return resData;
};

export const register = async (data) => {
  const response = await fetch(`${BACKEND_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  localStorage.setItem("token", resData.token);

  return resData;
};

export const checkAuth = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not logged in!");
  }

  const response = await fetch(`${BACKEND_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
};

export const updatePassword = async (data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User not logged in!");
  }

  const response = await fetch(`${BACKEND_URL}/users/updatePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  localStorage.setItem("token", resData.token);

  return resData;
};
