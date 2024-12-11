import { c as create_ssr_component, e as escape } from "./ssr.js";
const LoadingSpinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div data-svelte-h="svelte-194gxkm">Loading...</div>`;
});
const ErrorMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  return `<div>Error: ${escape(message)}</div>`;
});
export {
  ErrorMessage as E,
  LoadingSpinner as L
};
