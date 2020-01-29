
<script>
	import { onMount, onDestroy } from 'svelte';
  import { navigate } from "svelte-routing";
  import Board from '../game/Board.svelte';
  import Chat from './components/Chat.svelte';
  import { connectToRoom, disconnectFromRoom, getRoom } from "../api/room";
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
  $: enemy = isSelf(room.player1) ? 'player2' : 'player1';
  $: myTurn = room.game && myPlayer === room.game.turn;

  onMount(async () => {
    try {
      await connectToRoom(id, handleEvent);
    } catch (error) {
      console.warn(error.message);
      leaveRoom();
    }
  });
  onDestroy(() => disconnectFromRoom(id));
  
  function handleEvent(event) {
    switch (event.type) {
      case 'ROOM_FULL':
        leaveRoom();
        break;
      case 'ROOM_SETUP':
        room = event.payload;
        connecting = false;
        break;
      case 'ROOM_UPDATE':
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

  function leaveRoom() {
    navigate('/');
  }
</script>

{#if connecting}
Connecting...
{:else}
<div class="ui">
  <div class="ui-main">
    <Board 
      game={room.game}
      paused={playerMissing}
      myPlayer={myPlayer}
      enemy={enemy}
      myTurn={myTurn}
      selectField={selectField(id)}/>
    <!-- <div class="player player1">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#222" stroke-width="2" viewbox="0 0 173.20508075688772 200"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"></path></svg>
    </div>
    <div class="player player2">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#222" stroke-width="2" viewbox="0 0 173.20508075688772 200"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"></path></svg>
    </div> -->
  </div>
  <div class="ui-chat">
    <Chat messages={chatMessages} sendMessage={sendMessage(id)} />
  </div>
</div>
{/if}

<style>
	.ui {
    display: flex;
    min-height: 100vh;
    
	}
  .ui-main {
    flex: 1;
    align-self: center;
  }
</style>