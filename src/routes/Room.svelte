
<script>
	import { onMount } from 'svelte';
  import { connectToRoom, getRoom } from "../api/room";
  import { api } from '../api/api';

  export let id;
  let connecting = true;
  let messages = [];
  let players;

  async function fetchPlayers() {
    const response = await getRoom(id);
    players = response.payload.players;
  }

  function handleEvent(event) {
    messages = [...messages, JSON.stringify(event)];
    switch (event.type) {
      case 'PLAYER_JOINED':
        players = [...players, event.playerId];
      
    }
  }

  onMount(async () => {
    await fetchPlayers();
		await connectToRoom(id, handleEvent);
    
    connecting = false;
	});
</script>

{#if connecting}
Connecting...
{:else}
<div class="ui">
  <div>
    <p>Your room is {id}</p>
    <p>Players: {players.join(', ')}</p>
  </div>
  <ol class="dev-events">
    {#each messages as message}
      <li>{message}</li>
    {/each}
  </ol>
</div>
{/if}

<style>
	.ui {
		display: flex;
	}
  .dev-events {
    width: 30%;
    background: #eee;
    font-size: 12px;
    word-break: break-all;
  }
</style>