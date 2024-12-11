import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { M as MetaTags_1 } from "../../../chunks/MetaTags.js";
import { g as getCanonicalUrl } from "../../../chunks/url.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MetaTags_1, "MetaTags").$$render(
    $$result,
    {
      title: "About",
      description: "Get in touch with us. We'd love to hear from you!",
      canonical: getCanonicalUrl("/about")
    },
    {},
    {}
  )} <div class="about-page" data-svelte-h="svelte-1skvtk4"><h1>About</h1></div>`;
});
export {
  Page as default
};
