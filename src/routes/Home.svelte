
<script>
  import { onMount, onDestroy } from 'svelte';
  import { navigate, Link } from "svelte-routing";
  import { createRoom, connectToRoomList, disconnectFromRoomList } from "../api/room";

  let rooms;
  let loadingRooms = true;
  let creatingRoom = false;

  onMount(() => connectToRoomList(handleEvent));
  onDestroy(() => disconnectFromRoomList());

  function handleEvent(event) {
    switch (event.type) {
      case 'ROOMS_SETUP':
        rooms = event.payload;
        loadingRooms = false;
        break;
      case 'ROOMS_CHANGE':
        rooms = event.payload;
        break;
    }
  }

  async function onCreateRoom() {
    creatingRoom = true;
    const roomId = await createRoom();
    creatingRoom = false;
    enterRoom(roomId);
  }

  function enterRoom(id) {
    navigate(id);
  }
</script>

<button on:click={onCreateRoom} disabled={creatingRoom}>
  {creatingRoom ? 'Creating' : 'Create'} a room
</button>

{#if loadingRooms}
Loading rooms...
{:else}
<ul>
{#each rooms as room}
  <li>
    <Link to={room.id}>
      {room.id}<br>
      {#if room.player1 && room.player2}
        2
      {:else if room.player1 || room.player2}
        1
      {:else}
        0
      {/if}
      / 2
    </Link>
  </li>
{/each}
</ul>
{/if}
