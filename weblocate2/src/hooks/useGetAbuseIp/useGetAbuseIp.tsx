import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiKey = import.meta.env.VITE_ABUSE_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}

const apiCall = async (ip: string) => {
  const response = await axios.get(
    `/api/abuseipdb/api/v2/check?ipAddress=${ip}`,
    {
      headers: {
        Key: apiKey,
        Accept: "application/json",
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
