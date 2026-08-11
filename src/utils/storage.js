import { encrypt, decrypt } from "./crypto";

export const setStorage = (key, value) => {
  localStorage.setItem(key, encrypt(value));
};

export const getStorage = (key) => {
  const value = localStorage.getItem(key);

  if (!value) return null;

  return decrypt(value);
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};