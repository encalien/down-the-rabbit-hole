<script lang="ts">
  import { fly } from "svelte/transition";
  import type { Card } from "../../models/card";
  import type { Game } from "../../models/game";

  export let card: Card;
  export let game: Game = null;
  export let playable: boolean = true;
  export let accessorObject: any = null;
  export let className: string = null;

  function playCard(): void {
    if (!playable || !card.isPlayableThisTurn) return;
    game.playCard(card);
    accessorObject.updateGame(game);
  }
</script>

<div class="card { card.type } { className }" 
     out:fly={ {y: -100, duration: 400 } }
     on:dblclick={ playCard }>
  <div class="card-wrapper">
    <div class="card-title">
      <div class="card-cost" class:active={ card.cost <= game?.availableActionPoints }>{ card.cost }</div>
      { card.title } { card.id }
    </div>
    <div class="card-description">{ card.description }</div>
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
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

  .card-wrapper {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-top: 1rem solid black;
    border-image: linear-gradient(to right, black, chocolate, black) 1;
    height: 100%;
    padding: 0.3rem;
  }

  .card-title {
    font-size: 1rem;
    font-weight: bold;
    line-height: 2;
    height: 2rem;
  }

  .card-description {
    font-size: 0.8rem;
    height: 60%;
  }

  .card-cost {
    position: absolute;
    top: 2px;
    left: calc(60px - 0.3rem);
    width: 1.5rem;
    height: 1.5rem;
    background-color: dimgray;
    font-size: 1rem;
    font-weight: bold;
    border: 2px solid black;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    background-color: chocolate;
  }

  .card-selected {
    border: 3px solid chocolate;
  }
</style>
