<script lang="ts">
  import type { Card } from "../../models/card";
  import type { Game } from "../../models/game";

  export let card: Card;
  export let game: Game = null;
  export let playable: boolean = true;
  export let accessorObject: any = null;

  function playCard(): void {
    game.playCard(card);
    accessorObject.updateGame(game);
  }
</script>

<div class="card { card.type }">
  <div class="card-cost" class:active={ card.cost <= game?.availableActionPoints }>{ card.cost }</div>
  <div class="card-title">{ card.title }</div>
  <div class="card-description">{ card.description }</div>
  {#if playable && card.isPlayableThisTurn}
    <button on:click={ playCard }>Play</button>
  {/if}
</div>

<style>
  .card {
    display: block;
    width: 120px;
    height: 180px;
    padding: 0.5rem;
    border: 2px solid black;
    border-radius: 5px;
    color: black;
    text-align: center;
    position: relative;
  }

  .attack {
    background-color: lightcoral;
  }

  .skill {
    background-color: cadetblue;
  }

  .power {
    background-color: khaki;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .card-cost {
    position: absolute;
    top: 0;
    left: 0;
    background-color: dimgray;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0 0.5rem;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
    border-radius: 0 0 1rem;
  }

  .active {
    background-color: chocolate;
  }
</style>
