

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

<style>
@import '../node_modules/normalize.css/normalize.css';
</style>

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