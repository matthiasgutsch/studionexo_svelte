const BASE_URL = 'https://api.studionexo.com';

export async function getCountries(): Promise<any[]> {
  const response = await fetch(`${BASE_URL}/comuni/`);
  return response.json();
}

export async function getCountryBySlug(slug: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/comuni/slug/${slug}`);
  return response.json();
}

export async function getServices(): Promise<any[]> {
  // Replace with your actual services API endpoint
  const response = await fetch(`${BASE_URL}/services/`);
  return response.json();
}