<script lang="ts">
	import type { Entity } from '../models/entity';

  export let player: Entity;
</script>

<div id="player" class="player">
  <img src="/src/assets/alice_1.png" alt="Alice" class="player-image" draggable="false"/>
  <div class="name">{ player.name }</div>
  <div class="healthbar">{ player.currentHealth }/{ player.maxHealth }</div>
</div>

<style>
  .player {
    display: flex;
    flex-direction: column;
    height: 350px;
    padding: 0.5rem;
    text-align: center;
    justify-content: space-between;
  }

  .player-image {
    height: 300px;
  }
  
  .name {
    font-weight: bold;
  }
  
  .healthbar {
    background-color: red;
    font-size: 0.8rem;
    line-height: normal;
    font-weight: bold;
  }
</style>
