<script lang="ts">
  import type { PageData } from "./$types";
  import MetaTags from "../../../components/MetaTags.svelte";
  import LoadingSpinner from "../../../components/ui/LoadingSpinner.svelte";
  import ErrorMessage from "../../../components/ui/ErrorMessage.svelte";
  import { replaceText } from "../../../utils/text";
  import { getCanonicalUrl } from "../../../utils/url";
  import { onMount } from "svelte";

  export let data: PageData;

  let template = ""; // Template fetched from API
  let template_title = "";
  let content = ""; // Content generated from template
  let content_title = ""; // Content generated from template

  let loading = true; // Loading state
  let errorMessage = ""; // Error message if fetching fails

  // Function to fetch the template and replace_description_1 from API
  async function fetchTemplate() {
    try {
      const response = await fetch(
        `https://api.studionexo.com/category/slug//${data.service.slug}`
      );
      if (!response.ok) throw new Error("Failed to load template");

      const json = await response.json();
      template = json.replace_description_1;
      template_title = json.replace_title;

      // Check the template
      console.log("Fetched template:", template);

      // Replace placeholders with dynamic data if available
      if (data.country && data.service) {
        content = replaceText(template, {
          location: data.country.name,
          service: data.service.name,
        });
        content_title = replaceText(template_title, {
          location: data.country.name,
          service: data.service.name,
        });

        // Check the replaced content
        console.log("Content after replacement:", content);
      }
    } catch (error) {
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }

  // Fetch template on component mount
  onMount(fetchTemplate);

  // Generate canonical URL dynamically
  $: canonicalUrl =
    data.country && data.service
      ? getCanonicalUrl(`/${data.country.slug}/${data.service.slug}`)
      : getCanonicalUrl();

  // Update content if data.country or data.service changes
  $: {
    if (data.country && data.service) {
      content = replaceText(template, {
        location: data.country.name,
        service: data.service.name,
      });
      console.log("Updated content:", content); // Log updated content
    }
  }
</script>

{#if errorMessage}
  <ErrorMessage message={errorMessage} />
{:else if loading}
  <div>
    <LoadingSpinner />
  </div>
{:else if data.country && data.service}
  <MetaTags
    title={`${content_title}`}
    description={`Professional ${data.service.name} services in ${data.country.name}. Expert solutions tailored to your needs.`}
    canonical={canonicalUrl}
  />

  <article>
    <h1>{data.service.name} in {data.country.name}</h1>
    {@html content}
    <!-- Ensure this renders the HTML correctly -->

    <div>
      <h3>Sviluppo {data.service.name} a {data.country.name}</h3>
      <p>
        Realizzo {data.service.name} per qualsiasi attività a prezzi veramente competitivi!
        Ho lavorato oltre 5 anni in agenzia di comunicazione ed ho oltre 12 anni
        di esperienza. Dopo una breve telefonata, posso illustrarti tutti i servizi
        e consigliarti ciò che ti serve per incrementare la tua visibilità in rete.
        Ti posso seguire a 360° a partire dalla progettazione fino alla gestione
        dell’hosting, della posta elettronica e delle sue configurazioni per leggerla
        ovunque tu sia.
      </p>
    </div>

    {#if data.country.description}
      <section>
        <h2>About {data.country.name}</h2>
        <p>{data.country.description}</p>
      </section>
    {/if}

    {#if data.service.description}
      <section>
        <h2>About {data.service.name}</h2>
        <p>{data.service.description}</p>
      </section>
    {/if}
  </article>
{/if}
