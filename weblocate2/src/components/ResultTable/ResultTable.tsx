import { decimalToDMS } from "@/Helpers/helper";
import BarGraph from "../BarGraph/BarGraph";
import Map from "../Map/Map";
import { IpGeoLocationType, ResultTableType } from "@/Types/Types";

interface ResultTableProps {
  abuseData?: ResultTableType;
  ipGeoData?: IpGeoLocationType;
}

enum alertLevel {
  LOW = 10,
  MEDIUM = 25,
  HIGH = 100,
}

const ResultTable = ({ abuseData, ipGeoData }: ResultTableProps) => {
  const alertBorderColor = (score: number) => {
    if (score < alertLevel.LOW) {
      return "border-green-600";
    } else if (score < alertLevel.MEDIUM) {
      return "border-orange-500";
    } else {
      return "border-red-700";
    }
  };

  const barGraphColor = (score: number) => {
    if (score < alertLevel.LOW) {
      return "bg-green-600";
    } else if (score < alertLevel.MEDIUM) {
      return "bg-orange-500";
    } else {
      return "bg-red-700";
    }
  };

  const textScore = (score: number) => {
    if (score < alertLevel.LOW) {
      return <span className="text-green-600 ml-4">Good</span>;
    } else if (score < alertLevel.MEDIUM) {
      return <span className="text-orange-500 ml-4">Warning</span>;
    } else {
      return <span className="text-red-700 ml-4">BAD</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center lg:mx-16 sm:mx-2 md:mx-4">
      {abuseData && (
        <section
          className={`bg-white flex-col pt-2 pb-4 border-8 ${alertBorderColor(
            abuseData.abuseConfidenceScore
          )}`}
        >
          <div className="flex flex-row justify-center flex-wrap">
            <h1 className="text-center text-2xl mb-4 mr-4">
              IP: {abuseData.ipAddress}
            </h1>
            <img src={ipGeoData?.country_flag} className="h-6 mr-4 mt-1  shadow" />
            <h1 className="text-center text-2xl mb-4">
              {ipGeoData?.country_name_official}
            </h1>
          </div>
          {/* Column 1 */}
          <div className="flex flex-row justify-evenly">
            <div className="flex flex-col border-0 w-1/2 pl-20">
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">Domain:</p>
                <p>{abuseData.domain}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">ISP:</p>
                <p>{abuseData.isp}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">Usage:</p>
                <p>{abuseData.usageType}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">White listed:</p>
                <p>{abuseData.isWhitelisted ? "Yes" : "No"}</p>
              </div>

              <div className="flex flex-row space-x-2 mt-4">
                <p className="font-medium w-full">
                  Abuse Score: {textScore(abuseData.abuseConfidenceScore)}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <BarGraph
                  value={abuseData.abuseConfidenceScore}
                  colour={barGraphColor(abuseData.abuseConfidenceScore)}
                />
              </div>

              <div className="flex flex-row space-x-2 mt-4">
                <p className="font-medium sm:w-20 xl:w-30">Country:</p>
                <p>{ipGeoData?.country_name_official}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">District:</p>
                <p>{ipGeoData?.district}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">Zip Code:</p>
                <p>{ipGeoData?.zipcode}</p>
              </div>

              <div className="flex flex-row flex-wrap space-x-2 my-4">
                <div className="pr-4">
                  <p className="font-medium sm:w-20 xl:w-30">Latitude:</p>
                  <p>
                    {ipGeoData?.latitude}{" "}
                    {ipGeoData?.longitude &&
                      `(${decimalToDMS(parseFloat(ipGeoData?.latitude))})`}
                  </p>
                </div>
                <div>
                  <p className="font-medium sm:w-20 xl:w-30">Longitude:</p>
                  <p>
                    {ipGeoData?.longitude}{" "}
                    {ipGeoData?.longitude &&
                      `(${decimalToDMS(parseFloat(ipGeoData?.longitude))})`}
                  </p>
                </div>
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col border-0 w-1/2 pl-5 2xl:pl-50">
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">Host Names:</p>
                <p>{abuseData.hostnames}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">Country Code:</p>
                <p>{abuseData.countryCode}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">Public:</p>
                <p>{abuseData.isPublic ? "Yes" : "No"}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">TOR:</p>
                <p>{abuseData.isTor ? "Yes" : "No"}</p>
              </div>

              <div className="flex flex-row space-x-2 mt-4">
                <p className="font-medium sm:w-20 xl:w-30">Distinct Users:</p>
                <p>{abuseData.numDistinctUsers}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium sm:w-20 xl:w-30">Last Reported:</p>
                <p>
                  {new Date(abuseData.lastReportedAt).toLocaleString("en-GB", {
                    timeZone: "Australia/Sydney",
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="flex flex-row space-x-2 mt-4">
                <p className="font-medium w-30">State:</p>
                <p>{ipGeoData?.state_prov}</p>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-medium w-30">State Code:</p>
                <p>{ipGeoData?.state_code}</p>
              </div>
              <div className="flex flex-row space-x-2 h-5">
                <p className="font-medium w-30">City:</p>
                <p>{ipGeoData?.city}</p>
              </div>

              <div className="flex flex-row space-x-2 my-4"></div>
            </div>
          </div>

          <div className="px-4">
            {ipGeoData?.latitude && ipGeoData?.longitude && (
              <Map
                longitude={parseFloat(ipGeoData?.longitude)}
                latitude={parseFloat(ipGeoData?.latitude)}
                domain={abuseData.domain}
                city={ipGeoData.city}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResultTable;
