import { isLength, isAlphanumeric } from "validator";

const isUsername = (username) => {
  return isLength(username, { min: 5, max: 15 }) && isAlphanumeric(username);
};

export default isUsername;
