import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryCodePipe } from './pipes';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  getCountries() {
    return this.countriesService.getCountries();
  }

  @Get(':code')
  getCountriesInfo(@Param('code', CountryCodePipe) code: string) {
    return this.countriesService.getCountryInfo(code);
  }
}
