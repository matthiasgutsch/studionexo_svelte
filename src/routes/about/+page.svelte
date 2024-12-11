<script lang="ts">
  import MetaTags from "../../components/MetaTags.svelte";
  import { getCanonicalUrl } from "../../utils/url";
</script>

<MetaTags
  title="About"
  description="Get in touch with us. We'd love to hear from you!"
  canonical={getCanonicalUrl("/about")}
/>

<div class="about-page">
  <div class="container">
    <h1>About</h1>
  </div>
</div>
