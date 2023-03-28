<script lang="ts">
  import Hand from './Hand.svelte';
  import Game from '../models/game';

  let game = new Game();
  game.drawHand();
</script>

<div style="display: flex; flex-direction: column;">
  <!-- Player -->
  <!-- Enemy -->
  <!-- Decks -->
  <Hand game={ game }/>
</div>

<style></style>
