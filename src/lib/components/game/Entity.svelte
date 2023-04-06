<script lang="ts">
	import type { Entity } from '../../models/entity';
  import { toSnakeCase } from '../../utils';

  export let entity: Entity;
  export let accessorObject: any;

  let currentHealthPercentage: number; 

  $:entity, currentHealthPercentage = (entity.currentHealth / entity.maxHealth) * 100;
</script>

<div id="entity" class="entity">
  <img src="/src/assets/{ toSnakeCase(entity.name) }.png" alt="{ entity.name }" class="entity-image" draggable="false"/>
  <div class="entity-details">
    <div class="entity-name">{ entity.name }</div>
    <div class="entity-healthbar" class:block-active={ entity.block } 
         style="background: linear-gradient(to right, red {currentHealthPercentage}%, black {currentHealthPercentage}%)">
      <span class="block-display" class:block-active={ entity.block }>{ entity.block }</span>
      { entity.currentHealth }/{ entity.maxHealth }
    </div>
  </div>
</div>

<style>
  .entity {
    display: flex;
    flex-direction: column;
    height: 360px;
    width: 300px;
    padding: 0.5rem;
    text-align: center;
    justify-content: space-between;
    align-items: center;
  }

  .entity-image {
    height: 300px;
  }

  .entity-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .entity-name {
    font-weight: bold;
  }

  .entity-healthbar {
    font-size: 0.8rem;
    font-weight: bold;
    position: relative;
    width: 300px;
    border: 3px solid black;
    border-radius: 0.8rem;
    transition: border-color 0.3s ease-out;
  }

  .block-display {
    position: absolute;
    height: 28px;
    width: 28px;
    left: -32px;
    top: -7px;
    background-color: cadetblue;
    border: 3px solid black;
    border-radius: 50% 50% 50% 50% / 12% 12% 88% 88%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    transition: border-color 0.3s ease-out;
  }

  .block-active {
    border-color: aqua;
  }
</style>
