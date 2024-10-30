import axios, { AxiosResponse } from "axios";
import {
  APIError,
  BaseDeleteRequest,
  BaseDeleteResponse,
  BaseGetRequest,
  BaseGetResponse,
  BasePatchRequest,
  BasePatchResponse,
  BasePostRequest,
  BasePostResponse,
  BasePutRequest,
  BasePutResponse,
} from "../components/GlobalProviders/ErrorProvider/types";

export const handleError = (error: any): APIError => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;

    // Check for 500-class errors
    if (statusCode && statusCode >= 500) {
      return {
        message: "Unknown error",
        code: statusCode,
      };
    }

    // Check for 400-class errors
    if (statusCode && statusCode >= 400 && statusCode < 500) {
      return {
        message: error.response?.data?.message || error.message, // Use message from backend if available
        code: statusCode,
      };
    }

    // Default case for other errors
    return {
      message: error.message,
      code: statusCode || 520, // unknown error.
    };
  }

  return { message: "An unknown error occurred.", code: 520 };
};

export async function get<T extends BaseGetRequest, V extends BaseGetResponse>(
  request: T,
): Promise<V> {
  try {
    const { url, options } = request;
    const response: AxiosResponse<V> = await axios.get<V>(url, options);
    return { data: response.data } as V;
  } catch (error) {
    console.log(error);
    const apiError = handleError(error);

    return { data: "", error: apiError } as V;
  }
}

export async function post<
  T extends BasePostRequest,
  V extends BasePostResponse,
>(request: T): Promise<V> {
  try {
    const { url, data, options } = request;
    const response: AxiosResponse<V> = await axios.post<V>(url, data, options);
    return { data: response.data } as V;
  } catch (error) {
    console.log(error);
    const apiError = handleError(error);
    return { data: "", error: apiError } as V;
  }
}

export async function del<
  T extends BaseDeleteRequest,
  V extends BaseDeleteResponse,
>(request: T): Promise<V> {
  try {
    const { url, options } = request;
    const response: AxiosResponse<V> = await axios.delete<V>(url, options);

    return {
      data: response.data,
    } as V;
  } catch (error) {
    console.log(error);
    const apiError = handleError(error);

    return { data: "", error: apiError } as V;
  }
}

export async function put<T extends BasePutRequest, V extends BasePutResponse>(
  request: T,
): Promise<V> {
  try {
    const { url, data, options } = request;
    const response: AxiosResponse<V> = await axios.put<V>(url, data, options);
    return { data: response.data } as V;
  } catch (error) {
    console.log(error);
    const apiError = handleError(error);
    return { data: "", error: apiError } as V;
  }
}

export async function patch<
  T extends BasePatchRequest,
  V extends BasePatchResponse,
>(request: T): Promise<V> {
  try {
    const { url, options } = request;
    const response: AxiosResponse<V> = await axios.patch<V>(url, options);
    return { data: response.data } as V;
  } catch (error) {
    console.log(error);
    const apiError = handleError(error);
    return { data: "", error: apiError } as V;
  }
}
