const BACKEND_URL = "https://formbot-iyrw.vercel.app/api/v1";

export const fetchFormbot = async (id) => {
  const response = await fetch(`${BACKEND_URL}/formbots/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const resData = await response.json();

  console.log({ resData });

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
};

export const createFormbot = async (data) => {
  const response = await fetch(`${BACKEND_URL}/formbots/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
};

export const updateFormbot = async (data, id) => {
  const response = await fetch(`${BACKEND_URL}/formbots/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
};

export const fetchFormbotResponses = async (id) => {
  const response = await fetch(`${BACKEND_URL}/formbots/${id}/responses`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const resData = await response.json();

  console.log({ responses: resData });

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
};

export const deleteFormbot = async (formbotId) => {
  const response = await fetch(`${BACKEND_URL}/formbots/${formbotId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData.message);
  }

  return;
};
