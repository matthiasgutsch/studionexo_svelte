import { writable } from 'svelte/store';

interface ApiCall {
  timestamp: number;
  method: string;
  url: string;
  response: any;
  status: number;
  duration: number;
}

function createDebugStore() {
  const { subscribe, update } = writable<{
    apiCalls: ApiCall[];
    isVisible: boolean;
  }>({
    apiCalls: [],
    isVisible: false
  });

  return {
    subscribe,
    addApiCall: (apiCall: ApiCall) => {
      update(state => ({
        ...state,
        apiCalls: [apiCall, ...state.apiCalls].slice(0, 50) // Keep last 50 calls
      }));
    },
    toggleVisibility: () => {
      update(state => ({ ...state, isVisible: !state.isVisible }));
    },
    clear: () => {
      update(state => ({ ...state, apiCalls: [] }));
    }
  };
}

export const debugStore = createDebugStore();