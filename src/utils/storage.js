import { encryptData, decryptData } from "./encryption";

export const setStorage = (key, value) => {
  localStorage.setItem(key, encryptData(value));
};

export const getStorage = (key) => {
  const value = localStorage.getItem(key);

  if (!value) return null;

  return decryptData(value);
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};