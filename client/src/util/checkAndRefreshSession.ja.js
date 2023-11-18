import { refreshToken } from "../services/user";

const checkValidSession = (expireDate) => {
  const currentDate = new Date();
  return currentDate < new Date((expireDate));
}

const refreshSessionIfNeeded = async () => {
  if (!checkValidSession(localStorage.getItem('expiresAt'))) await refreshToken();
}

export default refreshSessionIfNeeded;
