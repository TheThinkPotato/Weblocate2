import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiKey = import.meta.env.VITE_ABUSE_API_KEY;
const isDev = import.meta.env.VITE_NODE_ENV === "dev";

if (!apiKey) {
  throw new Error("API key is not defined");
}

const apiCall = async (ip: string) => {
  const response = await axios.get(
    isDev
      ? `/api/abuseipdb/api/v2/check?ipAddress=${ip}`
      : `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&Key=${apiKey}`,
    {
      headers: {
        Key: apiKey,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Allow requests from any domain
      },
      timeout: 5000, // 5 seconds timeout
    }
  );
  return response.data;
};

const useGetAbuseIp = (ip: string, enabled = false) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["abuseIp", ip],
    queryFn: () => apiCall(ip),
    enabled: enabled,
  });

  if (isLoading) {
    return { loading: true };
  }
  if (isError) {
    return { error: error };
  }

  return { data, error, isLoading };
};

export default useGetAbuseIp;
