import type { ApiResponse } from '../types';

export abstract class BaseController<T> {
  protected abstract endpoint: string;
  protected baseUrl = 'https://api.studionexo.com';

  protected async get(path: string = ''): Promise<T> {
    const startTime = performance.now();
    const url = `${this.baseUrl}${this.endpoint}${path}`;

    try {
      const response = await fetch(url);
      const endTime = performance.now();
      const data = await response.json();

      // Log API call details to console
      console.group('API Call');
      console.log('URL:', url);
      console.log('Status:', response.status);
      console.log('Duration:', `${(endTime - startTime).toFixed(2)}ms`);
      console.log('Response:', data);
      console.groupEnd();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      // Log error details to console
      console.group('API Error');
      console.error('URL:', url);
      console.error('Error:', error.message || 'Network error');
      console.groupEnd();

      throw new Error(`Failed to fetch data: ${error.message || 'Network error'}`);
    }
  }

  protected async getAll(): Promise<T[]> {
    return this.get();
  }

  protected async getBySlug(slug: string): Promise<T> {
    return this.get(`/slug/${slug}`);
  }
}