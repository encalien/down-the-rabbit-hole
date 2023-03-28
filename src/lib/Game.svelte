<script lang="ts">
  import Hand from './Hand.svelte';
  import PileSidebar from './PileSidebar.svelte';
  import { Game } from '../models/game';
    import Player from './Player.svelte';

  let game: Game = new Game();
  let isDrawPileSidebarOpen: boolean = false;
  let isDiscardPileSidebarOpen: boolean = false;

  game.drawHand();

  function endTurn() {
    game.endTurn();
    game = game;
  }

  function togglePileShown(pileName) {
    switch (pileName) {
      case "draw":
        isDrawPileSidebarOpen = !isDrawPileSidebarOpen;
        break;
      case "discard":
        isDiscardPileSidebarOpen = !isDiscardPileSidebarOpen;
        setDiscardPileSidebarPosition();
        break;
    }
  }

  function setDiscardPileSidebarPosition(): void {
    const discardPileSidebarElement = document.getElementById("discard-pile-sidebar");
    const discardPileButton = document.getElementById("discard-pile");

    if (!discardPileSidebarElement) return;

    discardPileSidebarElement.style.left = discardPileButton.offsetLeft + "px";
  }
</script>

<div style="display: flex; flex-direction: column;">
  <div class="main-container">
    <!-- Player -->
    <Player player={ game.player }/>
    <!-- Enemy -->
  </div>
  <!-- Cards -->
  <div class="cards-container">
    {#if isDrawPileSidebarOpen}
      <div id="draw-pile-sidebar" class="pile-sidebar">
        <PileSidebar pile={ game.drawPile }/>
      </div>
    {/if}
    <div id="draw-pile" class="pile-wrapper">
      <button class="pile" on:click={ () => togglePileShown('draw') }>{ game.drawPile.length }</button>
      <div>Draw Pile</div>
    </div>
    <div id="hand">
      <Hand game={ game }/>
      <button on:click={ endTurn }>End turn</button>
    </div>
    <div id="discard-pile" class="pile-wrapper">
      <button class="pile" on:click={ () => togglePileShown('discard') }>{ game.discardPile.length }</button>
      <div>Discard Pile</div>
    </div>
    <!-- {#if isDiscardPileSidebarOpen} -->
    <div id="discard-pile-sidebar" class="pile-sidebar" class:hidden={!isDiscardPileSidebarOpen}>
      <PileSidebar pile={ game.discardPile }/>
    </div>
    <!-- {/if} -->
  </div>
</div>

<style>
  .cards-container {
    display: flex;
    gap: 60px;
    justify-content: space-between;
  }

  .main-container {
    /* vieport - cards-container height - main-container padding */
    height: calc(100vh - 240px - 40px); 
    display: flex;
    gap: 60px;
    justify-content: space-between;
    align-items: end;
    padding: 20px 140px;
  }

  .pile-wrapper {
    height: 240px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: end;
    flex-direction: column;
  }

  .pile {
    display: block;
    width: 80px;
    height: 120px;
    padding: 0.5rem;
    border: 2px solid black;
    border-radius: 5px;
    background-color: gray;
    color: black;
    font-size: 2rem;
    text-align: center;
    cursor: pointer;
  }

  .pile-sidebar {
    position: fixed;
    top: 50px;
    z-index: 1;
    height: calc(100vh - 50px - 200px);
    width: 120px;
    border: 2px solid black;
    border-radius: 3px;
    overflow: hidden;
  }
</style>
