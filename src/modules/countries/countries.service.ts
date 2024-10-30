import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import {
  ICountryDetailsResponse,
  ICountryFlagResponse,
  ICountryInfoOutput,
  ICountryListItem,
  ICountryPopulationResponse,
} from './types';

@Injectable()
export class CountriesService {
  private readonly countriesApiUrl: string;
  private readonly countriesInfoApiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.countriesApiUrl = this.configService.get<string>('COUNTRIES_API_URL');
    this.countriesInfoApiUrl = this.configService.get<string>(
      'COUNTRIES_INFO_API_URL',
    );
  }

  async getCountries(): Promise<ICountryListItem[]> {
    try {
      const response$ = this.httpService.get<ICountryListItem[]>(
        `${this.countriesApiUrl}/AvailableCountries`,
      );
      const response = await lastValueFrom(response$);

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch available countries',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCountryInfo(code: string): Promise<ICountryInfoOutput> {
    try {
      const flagData = await this.fetchFlagData(code);
      const countryInfo = await this.fetchCountryInfo(code);
      const populationData = await this.fetchPopulationData(
        countryInfo.commonName,
      );

      return {
        info: countryInfo,
        population: populationData.data.populationCounts,
        flagUrl: flagData.data.flag,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async fetchCountryInfo(
    code: string,
  ): Promise<ICountryDetailsResponse> {
    try {
      const response$ = this.httpService.get<ICountryDetailsResponse>(
        `${this.countriesApiUrl}/CountryInfo/${code}`,
      );
      const response = await lastValueFrom(response$);

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch country information',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async fetchPopulationData(countryName: string) {
    try {
      const response$ = this.httpService.post<ICountryPopulationResponse>(
        `${this.countriesInfoApiUrl}/countries/population`,
        {
          country: countryName,
        },
      );
      const response = await lastValueFrom(response$);

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch population data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async fetchFlagData(code: string) {
    try {
      const response$ = this.httpService.post<ICountryFlagResponse>(
        `${this.countriesInfoApiUrl}/countries/flag/images`,
        {
          iso2: code,
        },
      );
      const response = await lastValueFrom(response$);

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch flag data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
