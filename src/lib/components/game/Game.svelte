<script lang="ts">
  import Header from './Header.svelte';
  import Combat from './Combat.svelte';
  import RewardScreen from './RewardScreen.svelte';
  import type { Game } from '../../models/game';
  import { Phase } from '../../models/enums';

  export let game: Game;

  let accessorObject = {
    updateGame: updateGame,
  }

  function updateGame(newGameState: Game) {
    game = newGameState;
  }
</script>

<div class="main-container">
  <Header { game } on:openMenu />
  {#if game.phase === Phase.COMBAT}
    <Combat { game } { accessorObject } />
  {:else if game.phase === Phase.REWARD}
    <RewardScreen { game } { accessorObject } />
  {/if}
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: darkslategray;
  }
</style>
