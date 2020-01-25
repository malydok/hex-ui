
<script>
  import { connectToRoom, getRoom } from "../../api/room";

  export let sendMessage;
  export let messages;
  let message = '';

  function onSend() {
    if (!message) {
      return;
    }
    sendMessage(message);
    message = '';
  }
</script>

{#each messages as message}
<p class="message" class:own={message.own}>{message.text}</p>
{/each}
<form class="input" on:submit|preventDefault={onSend}>
  <input type="text" bind:value={message}>
</form>

<style>
.message {
  background: #eee;
  padding: 1rem;
  margin: 1px 0;
}
.own {
  background: #dddddd;
}
.input {
  margin-top: 1rem;
}
</style>