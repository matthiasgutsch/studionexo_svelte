import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header data-svelte-h="svelte-jeqxww"><nav><a href="/">Home</a> <a href="/contact">Contact</a> <a href="/about">About</a> <a href="/portfolio">Portfolio</a></nav></header> <main>${slots.default ? slots.default({}) : ``}</main> <footer><p>© ${escape((/* @__PURE__ */ new Date()).getFullYear())}.</p></footer>`;
});
export {
  Layout as default
};
