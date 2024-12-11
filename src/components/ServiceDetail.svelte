<script lang="ts">
  import { onMount } from 'svelte';
  import { serviceStore } from '../stores/serviceStore';
  import LoadingSpinner from './ui/LoadingSpinner.svelte';
  import ErrorMessage from './ui/ErrorMessage.svelte';
  import MetaTags from './MetaTags.svelte';

  export let slug: string;

  onMount(async () => {
    await serviceStore.loadServiceBySlug(slug);

    return () => {
      serviceStore.reset();
    };
  });
</script>

{#if $serviceStore.selectedService}
  <MetaTags
    title={`${$serviceStore.selectedService.name} - Service Details`}
    description={$serviceStore.selectedService.description || ''}
    canonical={`https://yourdomain.com/service/${slug}`}
  />
{/if}

<div class="service-detail">
  {#if $serviceStore.loading}
    <div class="center">
      <LoadingSpinner />
    </div>
  {:else if $serviceStore.error}
    <ErrorMessage message={$serviceStore.error} />
  {:else if $serviceStore.selectedService}
    <header>
      <h1>{$serviceStore.selectedService.name}</h1>
      {#if $serviceStore.selectedService.description}
        <p class="description">{$serviceStore.selectedService.description}</p>
      {/if}
    </header>
  {:else}
    <ErrorMessage message="Service not found" />
  {/if}
</div>

<style>
  .service-detail {
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

  h1 {
    margin: 0;
    color: #1a1a1a;
  }
</style>