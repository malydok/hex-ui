<script>
  import { connect } from "./api/api";
  import { createRoom, connectToRoom } from "./api/room";

  let connecting = true;
  async function connectToApi() {
    await connect();
    connecting = false;
  }
  connectToApi();

  let creatingRoom = false;
  let roomId;
  let roomMessages = [];

  function enterRoom(roomId) {
    connectToRoom(roomId, message => {
      roomMessages = [...roomMessages, JSON.stringify(message)];
    });
  }

  async function createRoomHandler() {
    creatingRoom = true;
    roomId = await createRoom();
    creatingRoom = false;
    enterRoom(roomId);
  }

  let roomInput = "";
  async function enterRoomHandler() {
    roomId = roomInput;
    enterRoom(roomId);
  }
</script>

{#if connecting}
  <p>Connecting</p>
{:else}
  {#if roomId}
    <p>Your room is {roomId}</p>
    <ol>
      {#each roomMessages as message}
        <li>{message}</li>
      {/each}
    </ol>
  {:else}
    <button on:click={createRoomHandler} disabled={creatingRoom}>
       {creatingRoom ? 'Creating' : 'Create'} a room
    </button>
    or
    <input type="text" placeholder="Paste room ID" bind:value={roomInput} />
    <button on:click={enterRoomHandler}>Enter room</button>
  {/if}
{/if}
