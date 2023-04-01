<script lang="ts">
  import Game from "./lib/components/game/Game.svelte";
  import Menu from "./lib/components/menu/Menu.svelte";
  import { Game as GameType } from "./lib/models/game";

  let isMainMenuShown: boolean = true;
  let game: GameType;

  function openMainMenu(): void {
    isMainMenuShown = true;
  }

  function playGame(event): void {
    switch (event.detail) {
      case "Start":
        game = new GameType();
        break;
      case "Continue":
        game = game || getSavedGame();
        break;
    }
  }

  function getSavedGame(): GameType {
    // TODO read from storage
    const storedGameJSON: string = '';
    return new GameType(storedGameJSON);
  }
</script>

<main>
  {#if isMainMenuShown}
    <Menu bind:isMainMenuShown={ isMainMenuShown } on:playGame={ playGame } />
  {:else}
    <Game {game} on:openMenu={ openMainMenu } />
  {/if}
</main>

<style></style>