import { c as create_ssr_component, b as subscribe, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { M as MetaTags_1 } from "../../chunks/MetaTags.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${validate_component(MetaTags_1, "MetaTags").$$render(
    $$result,
    {
      title: "404 - Page Not Found",
      description: "The page you're looking for doesn't exist.",
      canonical: ""
    },
    {},
    {}
  )} <div class="error-container"><h1>${escape($page.status)}</h1> <p class="error-message">${escape($page.error?.message || "Page not found")}</p> <a href="/" class="home-link" data-svelte-h="svelte-1qwlj8y">Go back home</a> </div>`;
});
export {
  Error as default
};
