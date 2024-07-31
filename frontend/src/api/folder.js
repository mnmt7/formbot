const BACKEND_URL = "http://localhost:3000/api/v1";

export const fetchFolder = async (folderId) => {
  const response = await fetch(`${BACKEND_URL}/folders/${folderId}`, {
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

export const createFolder = async (data) => {
  const response = await fetch(`${BACKEND_URL}/folders`, {
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

export const deleteFolder = async (folderId) => {
  const response = await fetch(`${BACKEND_URL}/folders/${folderId}`, {
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
