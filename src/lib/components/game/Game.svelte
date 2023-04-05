<script lang="ts">
  import Header from './Header.svelte';
  import Combat from './Combat.svelte';
  import type { Game } from '../../models/game';

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
  <Combat { game } { accessorObject } />
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: darkslategray;
  }
</style>
