<script lang="ts">
  import "../app.scss";
  import { onMount } from "svelte";

  onMount(() => {
    // Delay to ensure styles are injected before removing them
    setTimeout(() => {
      const sveltekitStyles = document.querySelectorAll(
        "style[data-sveltekit]"
      );
      sveltekitStyles.forEach((style) => style.remove());
    }, 0);
  });
</script>

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/contact">Contact</a>
    <a href="/about">About</a>
    <a href="/portfolio">Portfolio</a>
  </nav>
</header>

<main>
  <slot />
</main>

<footer>
  <p>&copy; {new Date().getFullYear()}.</p>
</footer>
