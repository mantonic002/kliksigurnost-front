import { useState } from "react";
import { toast } from "react-toastify";

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (requestFn: () => Promise<void>) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await requestFn();
    } catch (error: any) {
      console.error("Request failed:", error);
      toast.error(
        error.response.data ||
          error.message ||
          "Nepoznata greška, pokušajte ponovo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, sendRequest };
};
