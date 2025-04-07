import useCustomToast from "@/hooks/use-custom-toast";
import { deleteCookie } from "@/utils/cookies";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!window.location.pathname?.includes("/subscription-details")) {
      return config; // Skip adding the token
    }

    let token;

    if (typeof window !== "undefined") {
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("maria-cookie-token="))
        ?.split("=")[1];

      token = cookieToken;

      if (!token) {
        window.location.href = "/signin";
        return Promise.reject(new Error("No access token"));
      }
    }

    config.headers = {
      ...(config.headers as any),
      authorization: `Bearer ${token ? token : ""}`,
      "Content-Type": config.headers["Content-Type"] || "application/json",
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (errors) => {
    const { error } = useCustomToast();
    if (errors.response) {
      const status = errors.response.status;
      if (status === 401) {
        deleteCookie("maria-cookie-token");

        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/signin"
        ) {
          window.location.href = "/signin";
        }
        error("Please try again to login");
      }
    }

    return Promise.reject(errors);
  }
);

export default axiosInstance;
