<script lang="ts">
  import type { PageData } from "./$types";
  import MetaTags from "../components/MetaTags.svelte";
  import LoadingSpinner from "../components/ui/LoadingSpinner.svelte";
  import ErrorMessage from "../components/ui/ErrorMessage.svelte";
  import { getCanonicalUrl } from "../utils/url";

  export let data: PageData;
</script>

<MetaTags
  title="Countries and Services Directory"
  description="Browse our services across different locations"
  canonical={getCanonicalUrl()}
/>

<div>
  {#if data.error}
    <ErrorMessage message={data.error} />
  {:else if !data.countries || !data.services}
    <div>
      <LoadingSpinner />
    </div>
  {:else}
    <h1>Countries and Services</h1>
    <div>
      {#each data.countries as country}
        <div>
          <h2>{country.name}</h2>
          {#if country.description}
            <p>{country.description}</p>
          {/if}
          <div>
            {#each data.services as service}
              <a href="/{country.slug}/{service.slug}">
                {service.name}
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
