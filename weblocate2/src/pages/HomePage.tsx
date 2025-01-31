import ResultTable, {
  IpGeoLocationType,
  ResultTableType,
} from "@/components/ResultTable/ResultTable";
import SearchIp from "../components/SearchIp/SearchIp";
import { useState } from "react";
import useGetAbuseIp from "@/hooks/useGetAbuseIp/useGetAbuseIp";
import useGetIpGeoLocation from "@/hooks/useGetIpGeoLocation/useGetIpGeoLocation";
import Spinner from "@/components/Spinner/Spinner";
import ErrorMessage from "@/components/Error/ErrorContainer";

const Home = () => {
  const [queryIp, setQueryIp] = useState("");
  const [invalidIp, setInvalidIp] = useState(false);
  const [startSearch, setStartSearch] = useState(false);

  const searchIp = (ip: string) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    const isValidIp = ipv4Regex.test(ip);
    setInvalidIp(!isValidIp);

    if (!isValidIp) {
      return;
    }

    setQueryIp(ip);
    setStartSearch(true);
  };

  const { data: abuseIpData, loading: abuseIpLoading, error:abuseIpError } = useGetAbuseIp(
    queryIp,
    startSearch
  );
  const { data: geoData, loading: geoLoading, error: geoError } = useGetIpGeoLocation(
    queryIp,
    startSearch
  );

  const error = abuseIpError || geoError;

  const onChange = (value: string) => {
    value = value.trim();

    setStartSearch(false);
    setQueryIp(value);
  };

  return (
    <article className="flex w-screen h-screen bg-blue-950">
      <aside className=" min-w-[300px] xl:w-2/8 h-full bg-[#0e67b4]">
        <div className="flex flex-col">
          <div>
            <img src="/logo.jpg" alt="Logo" className="w-fit mx-auto mt-5" />
            <h1 className="text-white text-5xl mx-auto text-center font-bold">
              WebLocate
            </h1>

            <p className="mx-auto text-white text-center text-sm">
              Abuse Detection and Identification
            </p>
          </div>
          <div className="mt-16 mx-2">
            <SearchIp
              onSearch={searchIp}
              onChange={onChange}
              value={queryIp}
              invalidIp={invalidIp}
            />
          </div>
        </div>
      </aside>
      <section className="w-full h-full bg-blue-950">
        {error ? <ErrorMessage/> :         
        (abuseIpLoading || geoLoading ? (
          <Spinner />
        ) : (
          <ResultTable
            abuseData={abuseIpData?.data as ResultTableType}
            ipGeoData={geoData?.data as unknown as IpGeoLocationType}
          />
        ))}
      </section>
    </article>
  );
};

export default Home;
