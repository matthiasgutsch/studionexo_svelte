import { writable } from 'svelte/store';
import type { Service } from '../types';
import { serviceController } from '../controllers/ServiceController';
import { handleApiError } from '../utils';

function createServiceStore() {
  const { subscribe, set, update } = writable<{
    services: Service[];
    selectedService: Service | null;
    loading: boolean;
    error: string | null;
  }>({
    services: [],
    selectedService: null,
    loading: false,
    error: null
  });

  return {
    subscribe,
    loadServices: async () => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const services = await serviceController.getAllServices();
        update(state => ({ ...state, services, loading: false }));
      } catch (error) {
        const apiError = handleApiError(error);
        update(state => ({ ...state, error: apiError.message, loading: false }));
      }
    },
    loadServiceBySlug: async (slug: string) => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        const service = await serviceController.getServiceBySlug(slug);
        update(state => ({ ...state, selectedService: service, loading: false }));
      } catch (error) {
        const apiError = handleApiError(error);
        update(state => ({ ...state, error: apiError.message, loading: false }));
      }
    },
    reset: () => {
      set({
        services: [],
        selectedService: null,
        loading: false,
        error: null
      });
    }
  };
}

export const serviceStore = createServiceStore();