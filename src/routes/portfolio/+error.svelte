<script lang="ts">
  import { page } from "$app/stores";
  import MetaTags from "../../components/MetaTags.svelte";
</script>

<MetaTags
  title={`${$page.status} - Error`}
  description={$page.error?.message || "An error occurred"}
  canonical=""
/>

<div class="error-container">
  <h1>{$page.status}</h1>
  <p class="error-message">{$page.error?.message || "An error occurred"}</p>
  <a href="/" class="home-link">Go back home</a>
</div>
