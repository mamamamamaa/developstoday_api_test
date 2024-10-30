import * as process from 'process';

export const apiConfig = () => ({
  countriesApiUrl: process.env.COUNTRIES_API_URL,
  countriesInfoApiUrl: process.env.COUNTRIES_INFO_API_URL,
});
