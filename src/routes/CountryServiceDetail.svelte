<script lang="ts">
  import { onMount } from 'svelte';
  import { countryStore } from '../stores/countryStore';
  import { serviceStore } from '../stores/serviceStore';
  import { replaceText } from '../utils/text';
  import MetaTags from '../components/MetaTags.svelte';
  import LoadingSpinner from '../components/ui/LoadingSpinner.svelte';
  import ErrorMessage from '../components/ui/ErrorMessage.svelte';

  export let countrySlug: string;
  export let serviceSlug: string;

  const template = "Welcome to {country}! We offer excellent {service} services in this region. Our {service} expertise in {country} is unmatched.";

  onMount(async () => {
    await Promise.all([
      countryStore.loadCountryBySlug(countrySlug),
      serviceStore.loadServiceBySlug(serviceSlug)
    ]);
  });

  $: content = $countryStore.selectedCountry && $serviceStore.selectedService
    ? replaceText(template, $countryStore.selectedCountry.name, $serviceStore.selectedService.name)
    : '';
</script>

{#if $countryStore.selectedCountry && $serviceStore.selectedService}
  <MetaTags
    title={`${$serviceStore.selectedService.name} in ${$countryStore.selectedCountry.name}`}
    description={`Professional ${$serviceStore.selectedService.name} services in ${$countryStore.selectedCountry.name}. Expert solutions tailored to your needs.`}
    canonical={`https://yourdomain.com/${countrySlug}/${serviceSlug}`}
  />
{/if}

<div class="detail-page">
  {#if $countryStore.loading || $serviceStore.loading}
    <div class="center">
      <LoadingSpinner />
    </div>
  {:else if $countryStore.error}
    <ErrorMessage message={$countryStore.error} />
  {:else if $serviceStore.error}
    <ErrorMessage message={$serviceStore.error} />
  {:else if $countryStore.selectedCountry && $serviceStore.selectedService}
    <article>
      <h1>{$serviceStore.selectedService.name} in {$countryStore.selectedCountry.name}</h1>
      <p class="intro-text">{content}</p>
      
      {#if $countryStore.selectedCountry.description}
        <section>
          <h2>About {$countryStore.selectedCountry.name}</h2>
          <p>{$countryStore.selectedCountry.description}</p>
        </section>
      {/if}
      
      {#if $serviceStore.selectedService.description}
        <section>
          <h2>About {$serviceStore.selectedService.name}</h2>
          <p>{$serviceStore.selectedService.description}</p>
        </section>
      {/if}
    </article>
  {:else}
    <ErrorMessage message="Content not found" />
  {/if}
</div>

<style>
  .detail-page {
    max-width: 800px;
    margin: 0 auto;
  }

  .center {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  article {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  h2 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
    color: #2d3748;
  }

  .intro-text {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #4a5568;
  }

  section {
    margin: 2rem 0;
  }

  p {
    line-height: 1.6;
    color: #4b5563;
  }
</style>