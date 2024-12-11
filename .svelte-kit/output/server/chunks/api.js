const BASE_URL = "https://api.studionexo.com";
async function fetchApi(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;
      throw error;
    }
    const data = await response.json();
    if (!data) {
      const error = new Error("No data found");
      error.status = 404;
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}
const endpoints = {
  countries: "/comuni/",
  countryBySlug: (slug) => `/comuni/slug/${slug}`,
  services: "/category/",
  serviceBySlug: (slug) => `/category/slug/${slug}`
};
export {
  endpoints as e,
  fetchApi as f
};
