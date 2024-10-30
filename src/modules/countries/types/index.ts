export interface ICountryInfoOutput {
  info: ICountryDetailsResponse;
  population: ICountryPopulation[];
  flagUrl: string;
}

// All countries
export interface ICountryListItem {
  countryCode: string;
  name: string;
}

export interface ICountryDetailsResponse {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: ICountryBorderDetails[];
}

export interface ICountryBorderDetails extends ICountryDetailsResponse {
  borders: null;
}

// Country population
export interface ICountryPopulationResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: ICountryPopulation[];
  };
}

export interface ICountryPopulation {
  year: number;
  value: number;
}

// Country flag
export interface ICountryFlagResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  };
}
