import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL ?? "";

const apiCall = async (ip: string) => {
  const response = await axios.get(`${baseApiUrl}/api/abuse?ip=${ip}`, {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Allow requests from any domain
    },
    timeout: 5000, // 5 seconds timeout
  });
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
