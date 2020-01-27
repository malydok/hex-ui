<script>
  export let game;
  export let paused;
  export let myPlayer;
  export let enemy;
  export let myTurn;
  export let selectField;
</script>

{#if paused}
<p class="player-notice">Waiting for an opponent...</p>
{/if}
<div class="game" class:game-paused={paused}>
  <p class="player1 player-tag player1-tag" 
    class:active-turn={myPlayer === 'player1' && myTurn || myPlayer === 'player2' && !myTurn}>
    {myPlayer === 'player1' ? 'Me' : 'Enemy'}</p>
  <p class="player2 player-tag player2-tag" 
    class:active-turn={myPlayer === 'player2' && myTurn || myPlayer === 'player1' && !myTurn}>
    {myPlayer === 'player2' ? 'Me' : 'Enemy'}</p>
    
{#each game.board as row, rowIndex}
  <div class="row" style={`left: ${rowIndex * 0.5}em`}>
  {#each row as field, fieldIndex}
    <button 
      class="field"
      class:empty={!field}
      class:player1={field === 'player1'}
      class:player2={field === 'player2'}
      class:active-turn={
        (field === myPlayer && myTurn) ||
        (field === enemy && !myTurn)
      }
      disabled={field || !myTurn || paused}
      on:click={selectField(rowIndex, fieldIndex)}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 173.20508075688772 200"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"></path></svg>
    </button>
  {/each}
  </div>
{/each}
</div>

<style>
.game {
  position: relative;
  font-size: 5vmin;
  width: 16em;
  margin: 1em auto;
}
.game::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -.75em;
  width: 9.4em;
  transform: skewX(31deg);
  transform-origin: top left;
  border: 1em solid transparent;
  border-top-color: blue;
  border-bottom-color: blue;
  border-left-color: red;
  border-right-color: red;
}
.player-notice {
  margin-bottom: 2rem;
}
.game-paused {
  pointer-events: none;
}
.row {
  position: relative;
  display: flex;
  margin-top: -.5780346820809249em;
}
.field {
  padding: 0;
  margin: 0;
  margin-left: -1px;
  background: none;
  border: none;
  outline: none;
  width: 1em;
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
.player-tag {
  display: block;
  position: absolute;
  text-transform: uppercase;
  font-weight: bold;
}
.player1-tag {
  top: -1em;
}
.player2-tag {
  top: 0;
  left: 11.1em;
  transform: rotate(59deg);
  transform-origin: bottom left;
}
.field svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

@keyframes shine {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
.active-turn {
  animation: shine 2s infinite;
}
</style>