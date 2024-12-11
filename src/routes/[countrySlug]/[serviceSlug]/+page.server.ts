import { error } from "@sveltejs/kit";
import { fetchApi, endpoints } from "../../../utils/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  try {
    const [country, service] = await Promise.all([
      fetchApi(endpoints.countryBySlug(params.countrySlug)),
      fetchApi(endpoints.serviceBySlug(params.serviceSlug)),
    ]);

    if (!country || !service) {
      throw error(404, "Content not found");
    }

    return {
      country,
      service,
    };
  } catch (err: any) {
    // Handle API-specific 404 responses
    if (err.status === 404 || err.message?.includes("not found")) {
      throw error(404, "Page not found");
    }

    // Handle other API errors
    throw error(500, "Failed to load data");
  }
};
