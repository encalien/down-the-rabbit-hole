<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let isMainMenuShown: boolean = true;

  const menuItems: string[] = ["Continue", "Start"];

  const dispatch = createEventDispatcher();

  function openMenuItem(item): void {
    isMainMenuShown = false;
    dispatch('playGame', item)
  }
</script>

<div class="main-container">
  <h1 class="title">Down the rabbit hole</h1>
  <img src="/src/assets/down_the_rabbit_hole.png" alt="Down the Rabbit Hole">
  <div class="menu-items">
    {#each menuItems as item}
      <button class="btn" on:click={ () => openMenuItem(item) }>{ item }</button>
    {/each}
  </div>
</div>

<style>
  .main-container {
    height: calc(100vh - 6rem);
    background-color: darkslategray;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .btn {
    width: 120px;
  }
</style>