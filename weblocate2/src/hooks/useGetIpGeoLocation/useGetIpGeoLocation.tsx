import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiKey = import.meta.env.VITE_IPGEOLOCATION_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}

const apiCall = async (ip: string) => {
  const response = await axios.get(
      `/api/geoip/ipgeo?apiKey=${apiKey}&ip=${ip}`,
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
