<script lang="ts">
  import { onMount } from 'svelte';
  import { countryStore } from '../stores/countryStore';
  import { serviceStore } from '../stores/serviceStore';
  import LoadingSpinner from './ui/LoadingSpinner.svelte';
  import ErrorMessage from './ui/ErrorMessage.svelte';
  import MetaTags from './MetaTags.svelte';

  onMount(async () => {
    await Promise.all([
      countryStore.loadCountries(),
      serviceStore.loadServices()
    ]);
  });
</script>

<MetaTags
  title="Countries - Explore Our Services"
  description="Discover our services across different countries. Find the perfect solution for your needs in your region."
  canonical="https://yourdomain.com"
/>

<div class="country-list">
  {#if $countryStore.loading || $serviceStore.loading}
    <div class="center">
      <LoadingSpinner />
    </div>
  {:else if $countryStore.error}
    <ErrorMessage message={$countryStore.error} />
  {:else if $serviceStore.error}
    <ErrorMessage message={$serviceStore.error} />
  {:else}
    <h2>Select a Country and Service</h2>
    <div class="grid">
      {#each $countryStore.countries as country}
        <div class="country-card">
          <h3>{country.name}</h3>
          {#if country.description}
            <p class="description">{country.description}</p>
          {/if}
          <div class="services-grid">
            {#each $serviceStore.services as service}
              <a href="/{country.slug}/{service.slug}" class="service-link">
                {service.name}
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .country-list {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .center {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .country-card {
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    color: #1a1a1a;
    margin-bottom: 2rem;
  }

  h3 {
    margin: 0 0 1rem 0;
    color: #2d3748;
  }

  .description {
    font-size: 0.9rem;
    color: #4b5563;
    margin-bottom: 1rem;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .service-link {
    display: block;
    padding: 0.5rem;
    text-align: center;
    background-color: #f3f4f6;
    border-radius: 0.25rem;
    color: #4b5563;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .service-link:hover {
    background-color: #e5e7eb;
    color: #1a1a1a;
    transform: translateY(-1px);
  }
</style>