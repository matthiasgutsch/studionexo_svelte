<script lang="ts">
  import { onMount } from 'svelte';
  import { countryStore } from '../stores/countryStore';
  import { serviceStore } from '../stores/serviceStore';
  import MetaTags from '../components/MetaTags.svelte';
  import LoadingSpinner from '../components/ui/LoadingSpinner.svelte';
  import ErrorMessage from '../components/ui/ErrorMessage.svelte';

  onMount(async () => {
    await Promise.all([
      countryStore.loadCountries(),
      serviceStore.loadServices()
    ]);
  });
</script>

<MetaTags
  title="Countries and Services Directory"
  description="Browse our services across different locations"
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
    <h1 class="main-title">Countries and Services</h1>
    <div class="grid">
      {#each $countryStore.countries as country}
        <div class="country-card">
          <h2 class="country-name">{country.name}</h2>
          {#if country.description}
            <p class="country-description">{country.description}</p>
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
    max-width: 1200px;
    margin: 0 auto;
  }

  .main-title {
    text-align: center;
    margin-bottom: 2rem;
    color: #1a1a1a;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .country-card {
    padding: 1.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .country-name {
    margin: 0 0 1rem 0;
    color: #2d3748;
  }

  .country-description {
    margin-bottom: 1rem;
    color: #4b5563;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
  }

  .service-link {
    display: block;
    padding: 0.5rem;
    text-align: center;
    background: #f3f4f6;
    border-radius: 0.25rem;
    color: #4b5563;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .service-link:hover {
    background: #e5e7eb;
    color: #1a1a1a;
    transform: translateY(-1px);
  }

  .center {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }
</style>