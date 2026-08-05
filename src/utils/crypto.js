import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Hex.parse(import.meta.env.VITE_AES_KEY);
const IV = CryptoJS.enc.Hex.parse(import.meta.env.VITE_AES_IV);

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).ciphertext.toString(CryptoJS.enc.Base64);
};

export const decrypt = (cipher) => {
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

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
};