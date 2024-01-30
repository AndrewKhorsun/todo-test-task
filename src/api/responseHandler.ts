import { AxiosResponse } from "axios";

export const responseHandler = <T>(request: Promise<AxiosResponse<T>>) =>
  request
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage = error?.response?.data
        ? error?.response?.data
        : undefined;
      return Promise.reject(new Error(errorMessage));
    });
