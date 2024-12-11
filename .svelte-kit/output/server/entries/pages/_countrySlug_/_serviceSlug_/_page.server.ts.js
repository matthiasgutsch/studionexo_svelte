import { e as error } from "../../../../chunks/index.js";
import { f as fetchApi, e as endpoints } from "../../../../chunks/api.js";
const load = async ({ params }) => {
  try {
    const [country, service] = await Promise.all([
      fetchApi(endpoints.countryBySlug(params.countrySlug)),
      fetchApi(endpoints.serviceBySlug(params.serviceSlug))
    ]);
    if (!country || !service) {
      throw error(404, "Content not found");
    }
    return {
      country,
      service
    };
  } catch (err) {
    if (err.status === 404 || err.message?.includes("not found")) {
      throw error(404, "Page not found");
    }
    throw error(500, "Failed to load data");
  }
};
export {
  load
};
