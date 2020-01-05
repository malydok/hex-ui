
<script>
  import { navigate } from "svelte-routing";
  import { createRoom } from "../api/room";

  let roomId = "";
  let creatingRoom = false;

  async function onCreateRoom() {
    creatingRoom = true;
    const roomId = await createRoom();
    creatingRoom = false;
    enterRoom(roomId);
  }

  function onEnterRoom() {
    enterRoom(roomId);
  }

  function enterRoom(id) {
    navigate(id);
  }
</script>

<button on:click={onCreateRoom} disabled={creatingRoom}>
  {creatingRoom ? 'Creating' : 'Create'} a room
</button>
or
<input type="text" placeholder="Paste room ID" bind:value={roomId} />
<button on:click={onEnterRoom}>Enter room</button>

