import * as server from '../entries/pages/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.BBniWMCc.js","_app/immutable/chunks/scheduler.I48gaNEn.js","_app/immutable/chunks/index.CLjt9Cix.js","_app/immutable/chunks/MetaTags.DcyhbYko.js","_app/immutable/chunks/ErrorMessage.fC2y7Emy.js","_app/immutable/chunks/url.D__5ApGp.js"];
export const stylesheets = [];
export const fonts = [];
