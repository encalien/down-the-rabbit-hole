<script lang="ts">
  import type { Game } from '../../models/game';
  import type { Potion } from '../../models/potion';
  import { toSnakeCase } from '../../utils';

  export let game: Game;
  export let potion: Potion = null;
  export let usable: boolean = false;
  export let accessorObject: any;

  function usePotion(): void {
    game.usePotion(potion);
    accessorObject.updateGame(game);
  }
</script>


<div id="potion" class="potion">
  <button class="icon-btn" disabled={ !usable || !potion } on:click={ usePotion }>
    {#if potion}
      <img src="/src/assets/{ toSnakeCase(potion.title) }.png" alt="{ potion.title }" class="potion-image" draggable="false" />
    {:else}
      <img src="/src/assets/bottle_silhouette.png" class="potion-image" alt="Potion Slot">
    {/if}
  </button>
</div>

<style>
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

  .potion-image {
    height: 30px;
  }
</style>
