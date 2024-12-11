// @ts-nocheck
import { fetchApi, endpoints } from "../../utils/api";
import type { PageServerLoad } from "./$types";

export const load = async () => {
  try {
    const [countries, services] = await Promise.all([
      fetchApi(endpoints.countries),
      fetchApi(endpoints.services),
    ]);

    return {
      countries,
      services,
    };
  } catch (error) {
    return {
      error: "Failed to load data",
    };
  }
};
;null as any as PageServerLoad;