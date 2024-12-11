const BASE_URL = "https://api.studionexo.com";

export async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      (error as any).status = response.status;
      throw error;
    }

    const data = await response.json();

    if (!data) {
      const error = new Error("No data found");
      (error as any).status = 404;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

export const endpoints = {
  countries: "/comuni/",
  countryBySlug: (slug: string) => `/comuni/slug/${slug}`,
  services: "/category/",
  serviceBySlug: (slug: string) => `/category/slug/${slug}`,
};
