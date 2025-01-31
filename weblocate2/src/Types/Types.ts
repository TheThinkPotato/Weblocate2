export type ResultTableType = {
  ipAddress: string;
  isPublic: boolean;
  ipVersion: number;
  isWhitelisted: boolean;
  abuseConfidenceScore: number;
  countryCode: string;
  usageType: string;
  isp: string;
  domain: string;
  hostnames: [string];
  isTor: boolean;
  totalReports: number;
  numDistinctUsers: number;
  lastReportedAt: string;
};

export type IpGeoLocationType = {
  state_prov: string;
  state_code: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  country_flag?: string;
};

export type GoogleResolveAnswerType = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

export type googleResolveType = {
  Answer: GoogleResolveAnswerType[];
  Authority: [];
  Additional: [];
  Comment: string;
  Question: {
    name: string;
    type: number;
  };
};
