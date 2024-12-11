<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  
  export let title: string = '';
  export let description: string = '';
  export let canonical: string = '';
</script>

<MetaTags
  title={title}
  description={description}
  canonical={canonical}
  openGraph={{
    title,
    description,
    url: canonical,
    type: 'website'
  }}
  twitter={{
    title,
    description,
    card: 'summary_large_image'
  }}
/>