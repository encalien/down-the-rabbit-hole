<script lang="ts">
  import Hand from './Hand.svelte';
  import { Game } from '../models/game';

  let game: Game = new Game();
  game.drawHand();

  function endTurn() {
    game.endTurn();
    game = game;
  }

</script>

<div style="display: flex; flex-direction: column;">
  <!-- Player -->
  <!-- Enemy -->
  <!-- Decks -->
  <Hand game={ game }/>
  <button on:click={ endTurn }>End turn</button>
</div>

<style></style>
