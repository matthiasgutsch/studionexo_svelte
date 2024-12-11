declare global {
  namespace App {
    interface Locals {}
    interface PageData {
      countries?: any[];
      services?: any[];
      country?: any;
      service?: any;
      error?: string;
    }
    interface Error {}
    interface Platform {}
  }
}

export {};