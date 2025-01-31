import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiCall = async (domain: string) => {
  const response = await axios.get(
      `/api/dns.google/resolve?name=${domain}`,
      {
          headers: {
              Accept: "application/json",
          },
          timeout: 5000, // 5 seconds timeout
      }
  );  
  return response;
};

const useGetGoogleResolve = (domain: string, enabled = false) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["googleResolve", domain],
    queryFn: () => apiCall(domain),
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

export default useGetGoogleResolve;
