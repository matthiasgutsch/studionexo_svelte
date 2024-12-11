import { fetchApi, endpoints } from '../utils/api';
import type { Country } from '../types';

class CountryController {
  async getAllCountries(): Promise<Country[]> {
    return fetchApi(endpoints.countries);
  }

  async getCountryBySlug(slug: string): Promise<Country> {
    return fetchApi(endpoints.countryBySlug(slug));
  }
}

export const countryController = new CountryController();