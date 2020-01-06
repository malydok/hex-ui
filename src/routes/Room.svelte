
<script>
	import { onMount } from 'svelte';
  import { navigate } from "svelte-routing";
  import Board from '../game/Board.svelte';
  import Chat from './components/Chat.svelte';
  import DevLog from './components/DevLog.svelte';
  import { connectToRoom, getRoom } from "../api/room";
  import { sendMessage } from '../api/chat';
  import { selectField } from '../api/game';
  import { api, clientId } from '../api/api';

  export let id;
  let connecting = true;
  let events = [];
  let chatMessages = [];
  let players;
  let game;
  const isSelf = id => id === clientId;

  async function loadRoom() {
    const response = await getRoom(id);
    players = response.payload.players;
    game = response.payload.game;
  }

  function handleEvent(event) {
    events = [...events, event];
    switch (event.type) {
      case 'PLAYER_JOINED':
        players = [...players, event.playerId];
        break;
      case 'PLAYER_LEFT':
        players = players.filter(playerId => playerId === event.playerId);
        break;
      case 'CHAT_MESSAGE':
        chatMessages = [...chatMessages, {
          text: event.payload.message,
          own: isSelf(event.payload.client)
        }];
        break;
      case 'GAME_UPDATE':
        game = event.payload;
        break;
    }
  }

  onMount(async () => {
    try {
      await loadRoom();
      await connectToRoom(id, handleEvent);
      connecting = false;
    } catch (error) {
      navigate('/');
    }
	});
</script>

{#if connecting}
Connecting...
{:else}
<div class="ui">
  <div class="ui-main">
    <p>Your room is {id}</p>
    <Board 
      game={game}
      paused={players.length === 0}
      clientId={clientId} 
      selectField={selectField(id)}/>
  </div>
  <div class="ui-chat">
    <Chat messages={chatMessages} sendMessage={sendMessage(id)} />
  </div>
  <DevLog events={events} />
</div>
{/if}

<style>
	.ui {
		display: flex;
	}
  .ui-main {
    flex: 1;
  }
</style>