
<script>
	import { onMount } from 'svelte';
  import { navigate } from "svelte-routing";
  import Board from '../game/Board.svelte';
  import Chat from './components/Chat.svelte';
  import { connectToRoom, getRoom } from "../api/room";
  import { sendMessage } from '../api/chat';
  import { selectField } from '../api/game';
  import { api } from '../api/api';

  export let id;
  let connecting = true;
  let chatMessages = [];
  let room = {};
  const isSelf = id => id === api.id;
  $: playerMissing = !room.player1 || !room.player2;
  $: myPlayer = isSelf(room.player1) ? 'player1' : 'player2';

  function handleEvent(event) {
    switch (event.type) {
      case 'PLAYER_JOINED':
      case 'PLAYER_LEFT':
        room = event.payload;
        break;
      case 'CHAT_MESSAGE':
        chatMessages = [...chatMessages, {
          text: event.payload.message,
          own: isSelf(event.payload.client)
        }];
        break;
      case 'GAME_UPDATE':
        room = {
          ...room,
          game: event.payload
        };
        break;
    }
  }

  onMount(async () => {
    try {
      room = await connectToRoom(id, handleEvent);
      connecting = false;
    } catch (error) {
      console.error(error);
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
    <p>Player1: {room.player1}<br>
    Player2: {room.player2}</p>
    <p>I am {myPlayer}</p>
    <Board 
      game={room.game}
      paused={playerMissing}
      selectField={selectField(id)}/>
  </div>
  <div class="ui-chat">
    <Chat messages={chatMessages} sendMessage={sendMessage(id)} />
  </div>
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