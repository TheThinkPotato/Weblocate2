import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const isDev = import.meta.env.VITE_NODE_ENV === "dev";

const apiCall = async (ip: string) => {
  const response = await axios.get(
    isDev
      ? `http://127.0.0.1:5000/api/abuse?ip=${ip}`
      : `/api/abuse?ip=${ip}`,
    {
      headers: {
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
