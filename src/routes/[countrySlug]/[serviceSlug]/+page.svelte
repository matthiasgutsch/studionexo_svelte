<script lang="ts">
  import type { PageData } from "./$types";
  import MetaTags from "../../../components/MetaTags.svelte";
  import LoadingSpinner from "../../../components/ui/LoadingSpinner.svelte";
  import ErrorMessage from "../../../components/ui/ErrorMessage.svelte";
  import { replaceText } from "../../../utils/text";
  import { getCanonicalUrl } from "../../../utils/url";

  export let data: PageData;

  const template =
    "Welcome to {country}! We offer excellent {service} services in this region. Our {service} expertise in {country} is unmatched.";

  $: content =
    data.country && data.service
      ? replaceText(template, data.country.name, data.service.name)
      : "";

  $: canonicalUrl =
    data.country && data.service
      ? getCanonicalUrl(`/${data.country.slug}/${data.service.slug}`)
      : getCanonicalUrl();
</script>

{#if data.country && data.service}
  <MetaTags
    title={`${data.service.name} in ${data.country.name}`}
    description={`Professional ${data.service.name} services in ${data.country.name}. Expert solutions tailored to your needs.`}
    canonical={canonicalUrl}
  />
{/if}

<div>
  {#if data.error}
    <ErrorMessage message={data.error} />
  {:else if !data.country || !data.service}
    <div>
      <LoadingSpinner />
    </div>
  {:else}
    <article>
      <h1>{data.service.name} in {data.country.name}</h1>
      <p>{content}</p>

      <div>
        <h3>Sviluppo {data.service.name} a {data.country.name}</h3>
        <p>
          Realizzo {data.service.name} per qualsiasi attività a prezzi veramente
          competitivi! Ho lavorato oltre 5 anni in agenzia di comunicazione ed ho
          oltre 12 anni di esperienza. Dopo una breve telefonata, posso illustrarti
          tutti i servizi e consigliarti ciò che ti serve per incrementare la tua
          visibilità in rete. Ti posso seguire a 360° a partire dalla progettazione
          fino alla gestione dell’hosting, della posta elettronica e delle sue configurazioni
          per leggerla ovunque tu sia.
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
</div>
