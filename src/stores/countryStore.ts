import { writable } from 'svelte/store';
import type { Country } from '../types';
import { countryController } from '../controllers/CountryController';
import { handleApiError } from '../utils';

function createCountryStore() {
  const { subscribe, set, update } = writable<{
    countries: Country[];
    selectedCountry: Country | null;
    loading: boolean;
    error: string | null;
  }>({
    countries: [],
    selectedCountry: null,
    loading: false,
    error: null
  });

  return {
    subscribe,
    loadCountries: async () => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const countries = await countryController.getAllCountries();
        update(state => ({ ...state, countries, loading: false }));
      } catch (error) {
        const apiError = handleApiError(error);
        update(state => ({ ...state, error: apiError.message, loading: false }));
      }
    },
    loadCountryBySlug: async (slug: string) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const country = await countryController.getCountryBySlug(slug);
        update(state => ({ ...state, selectedCountry: country, loading: false }));
      } catch (error) {
        const apiError = handleApiError(error);
        update(state => ({ ...state, error: apiError.message, loading: false }));
      }
    },
    reset: () => {
      set({
        countries: [],
        selectedCountry: null,
        loading: false,
        error: null
      });
    }
  };
}

export const countryStore = createCountryStore();