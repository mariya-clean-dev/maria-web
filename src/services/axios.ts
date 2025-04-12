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

    token = sessionStorage.getItem("maria_access_token");
    console.log(token, "token");
    if (typeof window !== "undefined") {
      token = sessionStorage.getItem("maria_access_token");

      if (!token) {
        window.location.href = "/login";
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
    // const { error } = useCustomToast();
    // if (errors.response) {
    //   const status = errors.response.status;
    //   if (status === 401) {
    //     sessionStorage.clear();

    //     if (
    //       typeof window !== "undefined" &&
    //       window.location.pathname !== "/login"
    //     ) {
    //       window.location.href = "/login";
    //     }
    //     // error("Please try again to login");
    //   }
    // }

    return Promise.reject(errors);
  }
);

export default axiosInstance;
