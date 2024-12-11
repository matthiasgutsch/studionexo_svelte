import type { ApiError } from '../types';

export function handleApiError(error: any): ApiError {
  return {
    status: error.status || 500,
    message: error.message || 'An unexpected error occurred'
  };
}

export function isNetworkError(error: any): boolean {
  return !error.status || error.status === 0;
}