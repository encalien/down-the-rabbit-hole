<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "../../models/card";
  import { randomize } from "../../utils";

  export let pile: CardType[];
  export let showInOrder: boolean;
  export let turn: number;
  let pileToshow: CardType[];

  function preparePileToShow():void {
    pileToshow = showInOrder ? pile : randomize(pile);
  }
  $: turn, preparePileToShow();
</script>

<div class="pile-sidebar-wrapper">
  {#each pileToshow as card}
    <Card { card } playable={ false }/>
  {/each}
</div>

<style>
  .pile-sidebar-wrapper {
    background-color: rgba(0, 0, 0, 0.3);
    width: 120px;
    height: 100%;
    padding: 10px;
    padding-right: 60px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    z-index: 2;
    left: 0;
    overflow: auto;
  }

  .pile-sidebar-wrapper :global(.card) {
    width: 80px;
    height: 120px;
    font-size: 0.8rem;
    flex: 0 0 auto;
    position: relative;
    z-index: 3;
    opacity: 0.7;
    padding: 0.3rem;
	}

  .pile-sidebar-wrapper :global(.card-wrapper) {
    padding: 0.3rem;
    border-top-width: 0.8rem;
  }

  .pile-sidebar-wrapper :global(.card-title) {
    font-size: 0.8rem;
    line-height: 1.6;
    height: 1.6rem;
  }

  .pile-sidebar-wrapper :global(.card-description) {
    font-size: 0.6rem;
  }

  .pile-sidebar-wrapper :global(.card-cost) {
    width: 1rem;
    height: 1rem;
    left: calc(40px - 0.3rem);
    font-size: 0.8rem;
    top: 1px;
	}
</style>
