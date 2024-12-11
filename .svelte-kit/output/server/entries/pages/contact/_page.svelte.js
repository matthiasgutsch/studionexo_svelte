import { c as create_ssr_component, v as validate_component, f as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { M as MetaTags_1 } from "../../../chunks/MetaTags.js";
import { g as getCanonicalUrl } from "../../../chunks/url.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formData = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: ""
  };
  return `${validate_component(MetaTags_1, "MetaTags").$$render(
    $$result,
    {
      title: "Contact Us",
      description: "Get in touch with us. We'd love to hear from you!",
      canonical: getCanonicalUrl("/contact")
    },
    {},
    {}
  )} <div class="contact-page"><h1 data-svelte-h="svelte-179e290">Contact Us</h1> ${`<form><div class="form-group"><label for="name" data-svelte-h="svelte-141fipc">Name *</label> <input type="text" id="name" required${add_attribute("value", formData.name, 0)}></div> <div class="form-group"><label for="surname" data-svelte-h="svelte-103cf7q">Surname *</label> <input type="text" id="surname" required${add_attribute("value", formData.surname, 0)}></div> <div class="form-group"><label for="email" data-svelte-h="svelte-1lhf424">Email *</label> <input type="email" id="email" required${add_attribute("value", formData.email, 0)}></div> <div class="form-group"><label for="phone" data-svelte-h="svelte-bd8lrw">Phone *</label> <input type="tel" id="phone" required${add_attribute("value", formData.phone, 0)}></div> <div class="form-group"><label for="message" data-svelte-h="svelte-s6o4u2">Message *</label> <textarea id="message" rows="5" required>${escape("")}</textarea></div> <div class="recaptcha-container" data-svelte-h="svelte-mgbhg6"><div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div></div> ${``} <button type="submit" class="btn btn-primary" data-svelte-h="svelte-wiqu2q">Send Message</button></form>`} </div>`;
});
export {
  Page as default
};
