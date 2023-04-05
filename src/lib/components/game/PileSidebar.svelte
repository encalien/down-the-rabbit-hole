<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "../../models/card";
  import { randomize } from "../../utils";

  export let pile: CardType[];
  export let showInOrder: boolean;
</script>

<div class="pile-sidebar-wrapper">
  {#each (showInOrder ? pile : randomize(pile)) as card}
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
	}

  .pile-sidebar-wrapper :global(.card-title) {
    font-size: 1rem;
  }

  .pile-sidebar-wrapper :global(.card-cost) {
    line-height: 1.3rem;
    font-size: 1rem;
    padding: 0 0.3rem;
    border-radius: 0 0 0.8rem;
	}
</style>
