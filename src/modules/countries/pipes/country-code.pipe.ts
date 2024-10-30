import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { VALID_ISO_3166_1_ALPHA_2_CODES } from '../constants';

@Injectable()
export class CountryCodePipe implements PipeTransform {
  transform(value: any) {
    const code = value.toUpperCase();
    const isValidCode = VALID_ISO_3166_1_ALPHA_2_CODES.has(code);

    if (typeof value !== 'string' || !isValidCode) {
      throw new BadRequestException(
        `${value} is not a valid ISO 3166-1 alpha-2 country code`,
      );
    }

    return code;
  }
}
