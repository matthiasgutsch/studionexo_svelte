import type { Country, Service } from '../types';
import { fetchApi, endpoints } from './api';

export async function prefetchData(url: string) {
  const urlParts = url.split('/').filter(Boolean);
  
  if (urlParts.length === 2) {
    const [countrySlug, serviceSlug] = urlParts;
    return Promise.all([
      fetchApi<Country>(endpoints.countryBySlug(countrySlug)),
      fetchApi<Service>(endpoints.serviceBySlug(serviceSlug))
    ]);
  }
  
  return Promise.all([
    fetchApi<Country[]>(endpoints.countries),
    fetchApi<Service[]>(endpoints.services)
  ]);
}