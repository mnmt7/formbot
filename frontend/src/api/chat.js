const BACKEND_URL = "http://localhost:3000/api/v1";

export const fetchChat = async (id) => {
  const response = await fetch(`${BACKEND_URL}/chat/${id}`);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
};

export const sendResponseV1 = async (id, data) => {
  const response = await fetch(`${BACKEND_URL}/chat/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  console.log({ resData });

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
};

export const sendResponseV2 = async (id, data, method) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${BACKEND_URL}/chat/${id}`, options);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData;
};

export const sendResponse = async (id, data) => {
  const response = await fetch(`${BACKEND_URL}/chat/${id}`, {
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

  return resData;
};
