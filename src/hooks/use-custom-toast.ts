import { errorMessageParser } from "@/utils/get-error";
import { toast } from "sonner";

export type customToast = ReturnType<typeof useCustomToast>;

const useCustomToast = () => {
  const toastSuccess = (message: string, opts?: any) => {
    return toast(message, {
      ...(opts && { ...opts }),
    });
  };

  const toastError = (message: string, opts?: any) => {
    return toast("Uh oh! Something went wrong.", {
      variant: "destructive",
      description: message,
      ...(opts && { ...opts }),
    });
  };

  const showToastWithError = (error: any, errorKey?: string, opts?: any) => {
    const errorMessage = errorMessageParser(error, errorKey);
    return toastError(errorMessage, opts);
  };

  return {
    success: (message: string, opts?: any) => toastSuccess(message, opts),
    error: (message: string, opts?: any) => toastError(message, opts),
    showError: (error: any, errorKey?: string, opts?: any) =>
      showToastWithError(error, errorKey, opts),
  };
};
export default useCustomToast;
