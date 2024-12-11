<script lang="ts">
  import { page } from "$app/stores";
  import MetaTags from "../../../components/MetaTags.svelte";
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

<style>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 2rem;
  }

  h1 {
    font-size: 6rem;
    margin: 0;
    color: #1a1a1a;
  }

  .error-message {
    font-size: 1.5rem;
    margin: 1rem 0 2rem;
    color: #4b5563;
  }

  .home-link {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #2563eb;
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
  }

  .home-link:hover {
    background-color: #1d4ed8;
  }
</style>
