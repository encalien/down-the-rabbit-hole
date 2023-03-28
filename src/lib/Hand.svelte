<script lang="ts">
  import Card from "./Card.svelte";
  import type { Game } from "../models/game";

  export let game: Game;
  export let accessorObject: any;
</script>

<div id="hand">
  {#each game.hand as card}
    <Card { card } { game } { accessorObject } />
  {/each}
</div>

<style>
  #hand {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
  }
</style>
