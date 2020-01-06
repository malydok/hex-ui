<script>
  export let game;
  export let clientId;
  export let paused;
  export let selectField;
</script>

{#if paused}
<p class="player-notice">Waiting for an opponent...</p>
{/if}
<div class="game" class:game-paused={paused}>
{#each game as row, rowIndex}
  <div class="row" style={`margin-left: ${rowIndex * 2.732}vmin`}>
  {#each row as field, fieldIndex}
    <button 
      class="field" 
      class:own={field && field === clientId}
      class:opponents={field && field !== clientId}
      disabled={paused}
      on:click={selectField(rowIndex, fieldIndex)}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#222" stroke-width="2" viewbox="0 0 173.20508075688772 200"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"></path></svg>
    </button>
  {/each}
  </div>
{/each}
</div>

<style>
.player-notice {
  margin-bottom: 2rem;
}
.game-paused {
  pointer-events: none;
}
.row {
  display: flex;
  margin-top: -1.5vmin;
}
.field {
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  outline: none;
  width: calc(0.8660254037844386 * 6vmin);
  height: 6vmin;
  color: #ccc;
  cursor: pointer;
}
.field:hover {
  color: #aaa;
}
.own {
  color: blue;
}
.opponents {
  color: red;
}
.field svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>