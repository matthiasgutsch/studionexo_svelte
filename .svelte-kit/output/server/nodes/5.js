import * as server from '../entries/pages/_countrySlug_/_serviceSlug_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_countrySlug_/_serviceSlug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[countrySlug]/[serviceSlug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BmfgWC5o.js","_app/immutable/chunks/scheduler.I48gaNEn.js","_app/immutable/chunks/index.CLjt9Cix.js","_app/immutable/chunks/MetaTags.DcyhbYko.js","_app/immutable/chunks/ErrorMessage.fC2y7Emy.js","_app/immutable/chunks/url.D__5ApGp.js"];
export const stylesheets = [];
export const fonts = [];
