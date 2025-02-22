import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const isDev = import.meta.env.VITE_NODE_ENV === "dev";

const apiCall = async (ip: string) => {
  const response = await axios.get(
    isDev
      ? `http://127.0.0.1:5000/api/geo?ip=${ip}`
      : `/api/geo?ip=${ip}`,
    {
      headers: {
        Accept: "application/json",
      },
      timeout: 5000, // 5 seconds timeout
    }
  );
  return response;
};

const useGetIpGeoLocation = (ip: string, enabled = false) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["ipGeoLocation", ip],
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

export default useGetIpGeoLocation;
