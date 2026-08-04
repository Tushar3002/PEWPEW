import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET;

// Encrypt any object, array, string, number, etc.
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
};

// Decrypt back to original value
export const decryptData = (encryptedData) => {
  if (!encryptedData) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      SECRET_KEY
    );

    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted ? JSON.parse(decrypted) : null;
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};