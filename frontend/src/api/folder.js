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
