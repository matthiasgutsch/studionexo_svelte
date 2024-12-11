import * as server from '../entries/pages/portfolio/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/portfolio/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/portfolio/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.C1jdzuqN.js","_app/immutable/chunks/scheduler.I48gaNEn.js","_app/immutable/chunks/index.CLjt9Cix.js","_app/immutable/chunks/MetaTags.DcyhbYko.js","_app/immutable/chunks/ErrorMessage.fC2y7Emy.js","_app/immutable/chunks/url.D__5ApGp.js"];
export const stylesheets = [];
export const fonts = [];
