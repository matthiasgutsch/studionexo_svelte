<script lang="ts">
  import { debugStore } from '../../stores/debugStore';
  import { formatJson } from '../../utils/jsonFormatter';

  let selectedCall = null;
  let filter = '';

  $: filteredCalls = filter
    ? $debugStore.apiCalls.filter(call => 
        call.url.toLowerCase().includes(filter.toLowerCase()) ||
        call.status.toString().includes(filter)
      )
    : $debugStore.apiCalls;

  function formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }

  function getStatusColor(status: number): string {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 400 && status < 500) return 'text-orange-600';
    return 'text-red-600';
  }
</script>

<div class="debug-panel" class:visible={$debugStore.isVisible}>
  <div class="debug-header">
    <h2>API Inspector</h2>
    <div class="controls">
      <input
        type="text"
        bind:value={filter}
        placeholder="Filter calls..."
        class="filter-input"
      />
      <button class="clear-btn" on:click={() => debugStore.clear()}>Clear</button>
      <button class="close-btn" on:click={() => debugStore.toggleVisibility()}>×</button>
    </div>
  </div>

  <div class="debug-content">
    <div class="calls-list">
      {#each filteredCalls as call}
        <div
          class="call-item"
          class:selected={selectedCall === call}
          on:click={() => selectedCall = call}
        >
          <div class="call-method">GET</div>
          <div class="call-info">
            <div class="call-url">{call.url}</div>
            <div class="call-meta">
              <span>{formatTimestamp(call.timestamp)}</span>
              <span class={getStatusColor(call.status)}>{call.status}</span>
              <span>{call.duration.toFixed(2)}ms</span>
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if selectedCall}
      <div class="call-details">
        <h3>Response</h3>
        <pre>{formatJson(selectedCall.response)}</pre>
      </div>
    {/if}
  </div>
</div>

<style>
  .debug-panel {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 50vh;
    background: white;
    border-top: 1px solid #e2e8f0;
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 1000;
  }

  .visible {
    display: block;
  }

  .debug-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .filter-input {
    padding: 0.25rem 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
  }

  .clear-btn, .close-btn {
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 0.25rem;
    background: #e2e8f0;
    cursor: pointer;
  }

  .close-btn {
    font-size: 1.5rem;
    line-height: 1;
    padding: 0 0.5rem;
  }

  .debug-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: calc(50vh - 3rem);
    overflow: hidden;
  }

  .calls-list {
    overflow-y: auto;
    border-right: 1px solid #e2e8f0;
  }

  .call-item {
    display: flex;
    padding: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
    cursor: pointer;
  }

  .call-item:hover {
    background: #f8fafc;
  }

  .call-item.selected {
    background: #e2e8f0;
  }

  .call-method {
    padding: 0.25rem 0.5rem;
    background: #3b82f6;
    color: white;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    margin-right: 0.5rem;
  }

  .call-info {
    flex: 1;
  }

  .call-url {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  .call-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: #64748b;
  }

  .call-details {
    padding: 1rem;
    overflow-y: auto;
  }

  .call-details pre {
    font-size: 0.875rem;
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.25rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>