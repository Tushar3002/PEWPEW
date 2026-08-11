import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Hex.parse(import.meta.env.VITE_AES_KEY);
const IV = CryptoJS.enc.Hex.parse(import.meta.env.VITE_AES_IV);

export const encrypt = (data) => {
  const text = JSON.stringify(data);

  return CryptoJS.AES.encrypt(text, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).ciphertext.toString(CryptoJS.enc.Base64);
};

export const decrypt = (cipher) => {
  if (!cipher) return null;

  try {
    const decrypted = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(cipher),
      },
      KEY,
      {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const text = decrypted.toString(CryptoJS.enc.Utf8);

    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

export const encryptUrlParam = (value) => {
  return encodeURIComponent(encrypt(value));
};

export const decryptUrlParam = (value) => {
  try {
    return decrypt(decodeURIComponent(value));
  } catch {
    return "";
  }
};