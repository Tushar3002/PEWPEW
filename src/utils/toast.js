import { toast } from "react-toastify";

export const successToast = (message) =>
  toast.success(message, { theme: "colored" });

export const errorToast = (message) =>
  toast.error(message, { theme: "colored" });