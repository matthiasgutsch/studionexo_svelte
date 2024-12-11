import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { M as MetaTags_1 } from "../../../../chunks/MetaTags.js";
import { E as ErrorMessage, L as LoadingSpinner } from "../../../../chunks/ErrorMessage.js";
import { g as getCanonicalUrl } from "../../../../chunks/url.js";
function replaceText(template2, country, service) {
  return template2.replace(/\{country\}/g, country).replace(/\{service\}/g, service);
}
const template = "Welcome to {country}! We offer excellent {service} services in this region. Our {service} expertise in {country} is unmatched.";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let content;
  let canonicalUrl;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  content = data.country && data.service ? replaceText(template, data.country.name, data.service.name) : "";
  canonicalUrl = data.country && data.service ? getCanonicalUrl(`/${data.country.slug}/${data.service.slug}`) : getCanonicalUrl();
  return `${data.country && data.service ? `${validate_component(MetaTags_1, "MetaTags").$$render(
    $$result,
    {
      title: `${data.service.name} in ${data.country.name}`,
      description: `Professional ${data.service.name} services in ${data.country.name}. Expert solutions tailored to your needs.`,
      canonical: canonicalUrl
    },
    {},
    {}
  )}` : ``} <div>${data.error ? `${validate_component(ErrorMessage, "ErrorMessage").$$render($$result, { message: data.error }, {}, {})}` : `${!data.country || !data.service ? `<div>${validate_component(LoadingSpinner, "LoadingSpinner").$$render($$result, {}, {}, {})}</div>` : `<article><h1>${escape(data.service.name)} in ${escape(data.country.name)}</h1> <p>${escape(content)}</p> ${data.country.description ? `<section><h2>About ${escape(data.country.name)}</h2> <p>${escape(data.country.description)}</p></section>` : ``} ${data.service.description ? `<section><h2>About ${escape(data.service.name)}</h2> <p>${escape(data.service.description)}</p></section>` : ``}</article>`}`}</div>`;
});
export {
  Page as default
};
