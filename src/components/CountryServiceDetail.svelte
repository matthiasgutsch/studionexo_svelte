<script lang="ts">
  import { onMount } from 'svelte';
  import { countryStore } from '../stores/countryStore';
  import { serviceStore } from '../stores/serviceStore';
  import { replaceText } from '../utils';
  import LoadingSpinner from './ui/LoadingSpinner.svelte';
  import ErrorMessage from './ui/ErrorMessage.svelte';
  import MetaTags from './MetaTags.svelte';

  export let countrySlug: string;
  export let serviceSlug: string;

  const template = "Welcome to {country}! We offer excellent {service} services in this region. Our {service} expertise in {country} is unmatched.";

  onMount(async () => {
    await Promise.all([
      countryStore.loadCountryBySlug(countrySlug),
      serviceStore.loadServiceBySlug(serviceSlug)
    ]);

    return () => {
      countryStore.reset();
      serviceStore.reset();
    };
  });

  $: content = $countryStore.selectedCountry && $serviceStore.selectedService
    ? replaceText(template, $countryStore.selectedCountry.name, $serviceStore.selectedService.name)
    : '';
</script>

{#if $countryStore.selectedCountry && $serviceStore.selectedService}
  <MetaTags
    title={`${$serviceStore.selectedService.name} in ${$countryStore.selectedCountry.name}`}
    description={`Discover our ${$serviceStore.selectedService.name} services in ${$countryStore.selectedCountry.name}. Professional solutions tailored to your needs.`}
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
    <header>
      <h1>{$serviceStore.selectedService.name} in {$countryStore.selectedCountry.name}</h1>
      <div class="content">
        <p class="dynamic-text">{content}</p>
        {#if $countryStore.selectedCountry.description}
          <div class="description">
            <h2>About {$countryStore.selectedCountry.name}</h2>
            <p>{$countryStore.selectedCountry.description}</p>
          </div>
        {/if}
        {#if $serviceStore.selectedService.description}
          <div class="description">
            <h2>About Our {$serviceStore.selectedService.name} Service</h2>
            <p>{$serviceStore.selectedService.description}</p>
          </div>
        {/if}
      </div>
    </header>
  {:else}
    <ErrorMessage message="Content not found" />
  {/if}
</div>

<style>
  .detail-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .center {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .content {
    max-width: 800px;
    margin: 2rem auto;
    text-align: left;
  }

  .dynamic-text {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
  }

  .description {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 2.5rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    color: #4b5563;
    line-height: 1.6;
  }
</style>