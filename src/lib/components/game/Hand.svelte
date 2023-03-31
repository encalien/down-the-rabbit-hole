<script lang="ts">
  import Card from "./Card.svelte";
  import type { Game } from "../../models/game";

  export let game: Game;
  export let accessorObject: any;
</script>

<div id="hand">
  <div class="hand-cards">
    {#each game.hand as card}
      <Card { card } { game } { accessorObject } />
    {/each}
  </div>
  <div class="action-point-wrapper">
    {#each Array(game.currentMaxActionPoints) as ap, index}
      <div class="action-point" class:active={ index < game.availableActionPoints }></div>
    {/each}
  </div>
</div>

<style>
  .hand-cards {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
  }

  .action-point-wrapper {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }

  .action-point {
    width: 1rem;
    height: 1rem;
    background-color: black;
    border: 2px solid black;
    border-radius: 50%;
  }

  .active {
    background-color: chocolate;
  }
</style>
