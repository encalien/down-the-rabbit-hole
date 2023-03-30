<script lang="ts">
  import type { Game } from "../models/game";

  export let game: Game;
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
    <button class="icon-btn"><img src="/src/assets/gear_icon.png" alt="Settings"></button>
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
