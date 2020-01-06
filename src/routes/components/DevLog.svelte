<script>
  export let events;
</script>

<ol class="dev-events">
  {#each events as event}
    <li>{JSON.stringify(event)}</li>
  {/each}
</ol>

<style>
  .dev-events {
    position: fixed;
    top: 0;
    right: 0;
    opacity: 0;
    width: 300px;
    background: #eee;
    font-size: 12px;
    word-break: break-all;
    padding: 0 1rem;
  }
</style>