<script lang="ts">
  import { onMount } from 'svelte';
  import { countryStore } from '../stores/countryStore';
  import { serviceStore } from '../stores/serviceStore';
  import { replaceText } from '../utils';
  import LoadingSpinner from './ui/LoadingSpinner.svelte';
  import ErrorMessage from './ui/ErrorMessage.svelte';
  import MetaTags from './MetaTags.svelte';

  export let slug: string;

  const template = "Welcome to {country}! We offer excellent {service} services in this region. Our {service} expertise in {country} is unmatched.";

  onMount(async () => {
    await Promise.all([
      countryStore.loadCountryBySlug(slug),
      serviceStore.loadServices()
    ]);

    return () => {
      countryStore.reset();
      serviceStore.reset();
    };
  });
</script>

{#if $countryStore.selectedCountry}
  <MetaTags
    title={`${$countryStore.selectedCountry.name} - Services`}
    description={`Discover our services in ${$countryStore.selectedCountry.name}. ${$countryStore.selectedCountry.description || ''}`}
    canonical={`https://yourdomain.com/country/${slug}`}
  />
{/if}

<div class="country-detail">
  {#if $countryStore.loading || $serviceStore.loading}
    <div class="center">
      <LoadingSpinner />
    </div>
  {:else if $countryStore.error}
    <ErrorMessage message={$countryStore.error} />
  {:else if $serviceStore.error}
    <ErrorMessage message={$serviceStore.error} />
  {:else if $countryStore.selectedCountry}
    <header>
      <h1>{$countryStore.selectedCountry.name}</h1>
      {#if $countryStore.selectedCountry.description}
        <p class="description">{$countryStore.selectedCountry.description}</p>
      {/if}
    </header>
    
    <div class="services">
      <h2>Available Services</h2>
      <div class="service-grid">
        {#each $serviceStore.services as service}
          <div class="service-card">
            <h3>{service.name}</h3>
            <p>{replaceText(template, $countryStore.selectedCountry.name, service.name)}</p>
            {#if service.description}
              <p class="service-description">{service.description}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <ErrorMessage message="Country not found" />
  {/if}
</div>

<style>
  .country-detail {
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

  .description {
    color: #666;
    max-width: 600px;
    margin: 1rem auto;
  }

  .services {
    margin-top: 2rem;
  }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .service-card {
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .service-card:hover {
    transform: translateY(-2px);
  }

  .service-description {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
  }

  h1 {
    margin: 0;
    color: #1a1a1a;
  }

  h2 {
    color: #2d3748;
    margin-bottom: 1rem;
  }

  h3 {
    color: #1a1a1a;
    margin: 0 0 1rem 0;
  }
</style>