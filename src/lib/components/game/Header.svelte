<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Game } from "../../models/game";

  export let game: Game;
  const dispatch = createEventDispatcher();

  function openMainMenu():void {
    dispatch('openMenu', true)
  }
</script>

<div id="header" class="header">
  <div class="potions">
    <div class="icon-wrapper">
      <button class="icon-btn"><img src="/src/assets/bottle_silhouette.png" alt="Potion Slot"></button>
    </div>
    <div class="icon-wrapper">
      <button class="icon-btn"><img src="/src/assets/bottle_silhouette.png" alt="Potion Slot"></button>
    </div>
    <div class="icon-wrapper">
      <button class="icon-btn"><img src="/src/assets/bottle_silhouette.png" alt="Potion Slot"></button>
    </div>
  </div>
  <div class="level">
    { game.level }
  </div>
  <div class="settings">
    <button class="icon-btn" on:click={ openMainMenu }><img src="/src/assets/gear_icon.png" alt="Settings"></button>
  </div>
</div>

<style>
  .header {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    padding: 0 1rem;
  }

  .level {
    color: aliceblue;
    font-weight: bold;
  }

  .potions {
    display: flex;
    width: 100px;
  }

  .settings {
    display: flex;
    width: 100px;
    justify-content: end;
  }

  .icon-wrapper {
    width: 30px;
  }

  .icon-btn {
    background-color: transparent;
    border: none;
    display: flex;
    cursor: pointer;
    padding: 0;
  }

  .icon-btn > img {
    height: 30px;
    color: aliceblue;
  }
</style>
