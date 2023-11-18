const saveSessionExpiry = (expiresIn) => {
  const expiresAt = new Date();
  expiresAt.setTime(expiresAt.getTime() + expiresIn*1000);
  localStorage.setItem('expiresAt', expiresAt);
  return expiresAt;
}

export default saveSessionExpiry;