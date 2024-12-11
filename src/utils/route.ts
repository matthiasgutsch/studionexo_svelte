import { fetchApi, endpoints } from './api';
import type { Country, Service } from '../types';

export async function getAllRoutes(): Promise<string[]> {
  try {
    const [countries, services] = await Promise.all([
      fetchApi<Country[]>(endpoints.countries),
      fetchApi<Service[]>(endpoints.services)
    ]);
    
    const routes = ['/']; // Start with home route
    
    // Generate all possible country/service combinations
    for (const country of countries) {
      for (const service of services) {
        routes.push(`/${country.slug}/${service.slug}`);
      }
    }
    
    return routes;
  } catch (error) {
    console.error('Failed to generate routes:', error);
    return ['/'];
  }
}