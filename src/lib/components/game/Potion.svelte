<script lang="ts">
  import type { Game } from '../../models/game';
  import type { Potion } from '../../models/potion';
  import { toSnakeCase } from '../../utils';

  export let game: Game;
  export let potion: Potion = null;
  export let accessorObject: any;

  function usePotion(): void {
    game.usePotion(potion);
    accessorObject.updateGame(game);
  }
</script>


<div id="potion" class="potion">
  <div class="icon-wrapper">
    <button class="icon-btn" disabled={ !potion } on:click={ usePotion }>
      {#if potion}
        <img src="/src/assets/{ toSnakeCase(potion.title) }.png" alt="{ potion.title }" class="potion-image" draggable="false"/>
      {:else}
        <img src="/src/assets/bottle_silhouette.png" alt="Potion Slot">
      {/if}
    </button>
  </div>
</div>

<style>
  .icon-wrapper {
    width: 30px;
  }

  .icon-btn {
    background-color: transparent;
    border: none;
    display: flex;
    cursor: pointer;
    padding: 0;
  }

  .icon-btn:disabled {
    cursor: initial;
  }

  .icon-btn > img {
    height: 30px;
    color: aliceblue;
  }
</style>
