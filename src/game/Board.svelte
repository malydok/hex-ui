<script>
  export let game;
  export let paused;
  export let myTurn;
  export let selectField;
</script>

{#if paused}
<p class="player-notice">Waiting for an opponent...</p>
{/if}
<div class="game" class:game-paused={paused}>
{#each game.board as row, rowIndex}
  <div class="row" style={`margin-left: ${rowIndex * 2.732}vmin`}>
  {#each row as field, fieldIndex}
    <button 
      class="field"
      class:empty={!field}
      class:player1={field === 'player1'}
      class:player2={field === 'player2'}
      disabled={field || !myTurn || paused}
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
}
.field:active,
.field:focus {
  outline: none;
}
.field.empty:not([disabled]) {
  cursor: pointer;
}
.field.empty:not([disabled]):hover {
  color: #aaa;
}
.player1 {
  color: blue;
}
.player2 {
  color: red;
}
.field svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>