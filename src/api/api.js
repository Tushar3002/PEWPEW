import axios from "axios";
import { loader } from "../utils/loaderController";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://pewdevapi.alliancetek.net/api/v1",
});
const defaultApiOptions = {
  showLoader: true,
  showSuccessToast: false,
  showErrorToast: true,
  useToken: true,
};

api.interceptors.request.use((config) => {
  config = {
    ...defaultApiOptions,
    ...config,
  };

  if (config.showLoader) {
    loader.show();
  }

  if (config.useToken) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.config.showLoader) {
      loader.hide();
    }

    if (response.config.showSuccessToast) {
      toast.success(response.data.message);
    }

    return response;
  },

  (error) => {
    if (error.config?.showLoader) {
      loader.hide();
    }
    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.config?.showErrorToast !== false) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again.",
        {
          theme: "colored",
        }
      );
    }

    return Promise.reject(error);
  },
);
