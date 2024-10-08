import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { addOnCache, getFromCache } from "../utils/cacheHolder";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  error?: string;
};

type UseMutationResult<T> = {
  mutate: (
    url: string,
    method: string,
    bodyData?: any,
    refetch?: () => void | undefined,
    // cache?:boolean
  ) => Promise<void>;
  data: T | undefined;
  error: boolean;
  loading: boolean;
  response: any;
};

export const useMutation = <T>(): UseMutationResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>();
  const abortRef = useRef<AbortController | null>(null);

  const mutate = async (
    url: string,
    method: string,
    bodyData?: any,
    refetch?: () => void,
    cache = false,
  ) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();
    const signal = abortRef.current?.signal;

    const payload =
      url +
      Object.keys(bodyData).toString() +
      Object.values(bodyData).toString();
    const cacheData = getFromCache(payload);
    if (cache && cacheData) {
      setData(cacheData);
      return;
    }
    setError(false);
    setLoading(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_HOST}${url}`, {
        method,
        credentials: "include",
        signal,
        body:
          bodyData instanceof FormData ? bodyData : JSON.stringify(bodyData),
        headers:
          bodyData instanceof FormData
            ? {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            : {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
      });
      // console.log(resp);
      const respData: ApiResponse<T> = await resp.json();
      console.log(respData);
      setResponse(respData);
      if (!respData.success) {
        setError(true);
        toast.error(respData.error);
      } else {
        setData(respData.data);
        if (cache) {
          addOnCache(payload, respData.data);
        }
        if (respData.message) {
          toast.success(respData.message);
        }
        refetch && refetch();
      }
      setLoading(false);
    } catch (error: any) {
      if (error.name == "AbortError") {
        console.log("abort");
        return;
      }
      console.log(error);
      setLoading(false);
      setError(true);
      toast.error(error.message);
    }
  };

  return {
    mutate,
    data,
    response,
    error,
    loading,
  };
};
