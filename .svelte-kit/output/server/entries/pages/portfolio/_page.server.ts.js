import { f as fetchApi, e as endpoints } from "../../../chunks/api.js";
const load = async () => {
  try {
    const [countries, services] = await Promise.all([
      fetchApi(endpoints.countries),
      fetchApi(endpoints.services)
    ]);
    return {
      countries,
      services
    };
  } catch (error) {
    return {
      error: "Failed to load data"
    };
  }
};
export {
  load
};
