import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../chunks/ssr.js";
import { M as MetaTags_1 } from "../../chunks/MetaTags.js";
import { E as ErrorMessage, L as LoadingSpinner } from "../../chunks/ErrorMessage.js";
import { g as getCanonicalUrl } from "../../chunks/url.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${validate_component(MetaTags_1, "MetaTags").$$render(
    $$result,
    {
      title: "Countries and Services Directory",
      description: "Browse our services across different locations",
      canonical: getCanonicalUrl()
    },
    {},
    {}
  )} <div>${data.error ? `${validate_component(ErrorMessage, "ErrorMessage").$$render($$result, { message: data.error }, {}, {})}` : `${!data.countries || !data.services ? `<div>${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}</div>` : `<h1 data-svelte-h="svelte-1t1gc4d">Countries and Services</h1> <div>${each(data.countries, (country) => {
    return `<div><h2>${escape(country.name)}</h2> ${country.description ? `<p>${escape(country.description)}</p>` : ``} <div>${each(data.services, (service) => {
      return `<a href="${"/" + escape(country.slug, true) + "/" + escape(service.slug, true)}">${escape(service.name)} </a>`;
    })}</div> </div>`;
  })}</div>`}`}</div>`;
});
export {
  Page as default
};
