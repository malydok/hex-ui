

<script>
  import {onMount} from 'svelte';
  import { Router, Link, Route } from "svelte-routing";
  import { api } from './api/api';
  import Home from "./routes/Home.svelte";
  import Room from "./routes/Room.svelte";

  export let url = "";
  let loading = true;

  onMount(async () => {
    await api.connect();
    loading = false;
  });
</script>

{#if loading}
Loading app
{:else}
<Router url="{url}">
  <Route path="/:id" let:params>
    <Room id="{params.id}"/>
  </Route>
  <Route path="/"><Home /></Route>
</Router>
{/if}

<style global>
* {
  margin: 0;
  padding: 0;
}
</style>