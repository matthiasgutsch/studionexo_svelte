import { fetchApi, endpoints } from '../utils/api';
import type { Service } from '../types';

class ServiceController {
  async getAllServices(): Promise<Service[]> {
    return fetchApi(endpoints.services);
  }

  async getServiceBySlug(slug: string): Promise<Service> {
    return fetchApi(endpoints.serviceBySlug(slug));
  }
}

export const serviceController = new ServiceController();