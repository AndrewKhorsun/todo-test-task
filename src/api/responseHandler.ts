import { AxiosResponse, AxiosError } from "axios";

interface ErrorType {
  [key: string]: string[];
}

export const responseHandler = <T>(request: Promise<AxiosResponse<T>>) =>
  request
    .then((response) => response.data)
    .catch((error) => {
      const err = error as AxiosError<ErrorType> | undefined;
      const errorMessage = err?.response?.data
        ? Object.values(err.response.data)[0].join(", ")
        : undefined;
      return Promise.reject(new Error(errorMessage));
    });
