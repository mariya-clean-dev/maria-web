export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((c) => c.trim().startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const setCookie = (
  name: string,
  value: string,
  days: number = 7
): void => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
};
