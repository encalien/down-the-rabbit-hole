<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from '../models/card';

  import { cardCollection } from "../server/cards_collection";

  let hand: CardType[] = cardCollection;
</script>

<div id="hand">
  {#each hand as card}
    <Card card={ card } />
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
