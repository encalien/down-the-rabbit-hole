<script lang="ts">
  import Header from './Header.svelte';
  import Combat from './Combat.svelte';
  import RewardScreen from './RewardScreen.svelte';
  import type { Game } from '../../models/game';
  import { Phase } from '../../models/enums';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let game: Game;

  const dispatch = createEventDispatcher();

  let accessorObject = {
    updateGame: updateGame,
  }

  function updateGame(newGameState: Game): void {
    game = newGameState;
  }
</script>

<div class="main-container">
  <Header { game } on:openMenu />
  {#if game.phase === Phase.COMBAT}
    <Combat { game } { accessorObject } />
  {:else if game.phase === Phase.REWARD}
    <RewardScreen { game } { accessorObject } />
  {:else if game.phase === Phase.END}
    <div class="end-game-wrapper">
      <div class="{ game.player.currentHealth > 0 ? 'victory' : 'game-over' }" in:fade={{ duration: 1000 }}>
        { game.player.currentHealth > 0 ? "VICTORY!" : "GAME OVER" }
      </div>
      <button class="btn" on:click={ () => dispatch('endGame', true) }>Continue</button>
    </div>
  {/if}
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: darkslategray;
    height: 100vh;
  }

  .end-game-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: calc(100vh - 40px);
    align-items: center;
  }

  .game-over {
    font-size: 4rem;
    font-weight: bold;
    color: red;
  }

  .victory {
    font-size: 4rem;
    font-weight: bold;
    color: chocolate;
  }
</style>
