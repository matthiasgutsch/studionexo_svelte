<script lang="ts">
  import { debugStore } from '../../stores/debugStore';
</script>

<button class="debug-toggle" on:click={() => debugStore.toggleVisibility()}>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v3m6.366 2.634l-2.121 2.121m5.755 3.245h-3m-.755 5.755l-2.121-2.121M12 21v-3m-6.366-2.634l2.121-2.121M3 12h3m.755-5.755l2.121 2.121"/>
  </svg>
</button>

<style>
  .debug-toggle {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: white;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1001;
  }

  .debug-toggle:hover {
    background: #f8fafc;
  }
</style>