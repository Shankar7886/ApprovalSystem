import axios, { AxiosRequestConfig, AxiosError } from "axios";
import Config from "@/utils/Config";
import { toast } from "sonner";

interface APIConfig {
  method: string;
  URL: string;
}

export const callAPI = async (
  API: APIConfig = { method: "get", URL: "" },
  bodyParams: any = {},
  headers: Record<string, string> | null = null,
  params: Record<string, any> = {}
): Promise<any> => {
  const TokenValue = Config.getAccessToken();
  const method = API?.method?.toLowerCase() || "get";

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(TokenValue && { Authorization: `Bearer ${TokenValue}` }),
  };

  const APIHeaders = headers ?? defaultHeaders;

  // Base config
  const config: AxiosRequestConfig = {
    url: ["put","delete"].includes(method)?`${Config.BASEURL}${API.URL}/${params}`:`${Config.BASEURL}${API.URL}`,
    method: method as any,
    headers: APIHeaders,
    params: ["d", "sdf"].includes(method) ? params : undefined,
    ...(method === "put" && { data: JSON.stringify(bodyParams) }),
    ...(method === "post" && { data: JSON.stringify(bodyParams) }),
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return handleAxiosError(error, API.URL);
  }
};

const handleAxiosError = (error: unknown, url: string): null => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
     
      return null;
    }

    const message =
      (axiosError.response?.data as any)?.Message ||
      axiosError.message ||
      "Unknown Axios error";

    toast.error(message, {
      duration: 2000,
      position: "top-right",
      description: `Error in call of ${url}`,
    });

    console.error(`Axios error on ${url}:`, axiosError);
  } else {
    toast.error("Unknown error", {
      duration: 2000,
      position: "top-right",
      description: `Error in call of ${url}`,
    });

    console.error(`Non-Axios error on ${url}:`, error);
  }

  return null;
};

