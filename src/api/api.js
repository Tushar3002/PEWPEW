import axios from "axios";
import { loader } from "../utils/loaderController";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://pewdevapi.alliancetek.net/api/v1",
});
const defaultApiOptions = {
  showLoader: true,
  showSuccessToast: false,
  skipToast: false,
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
    const message = error.response?.data?.message || "Something went wrong";

    const status = error.response?.status;

    // Avoid toast if explicitly disabled
    if (!error.config?.skipToast && status !== 401) {
      toast.error(message, {
        theme: "colored",
      });
    }

    // Unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
    }

    //  FOrbidden
    if (status === 403) {
      toast.error(message, {
        theme: "colored",
      });
    }

    return Promise.reject(error);
  },
);
