<script lang="ts">
	import type { Entity } from '../models/entity';
  import { toSnakeCase } from '../utils';

  export let entity: Entity;
  export let accessorObject: any;
</script>

<div id="entity" class="entity">
  <img src="/src/assets/{ toSnakeCase(entity.name) }.png" alt="{ entity.name }" class="entity-image" draggable="false"/>
  <div class="entity-details">
    <div class="entity-name">{ entity.name }</div>
    <div class="entity-healthbar">
      <span class="block">{ entity.block }</span>
      { entity.currentHealth }/{ entity.maxHealth }
    </div>
  </div>
</div>

<style>
  .entity {
    display: flex;
    flex-direction: column;
    height: 380px;
    padding: 0.5rem;
    text-align: center;
    justify-content: space-between;
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
    /* TODO: make healthbar color reflect hitpoints */
    background-color: red;
    font-size: 0.8rem;
    font-weight: bold;
    position: relative;
  }

  .block {
    position: absolute;
    height: 28px;
    width: 28px;
    left: -22px;
    top: -4px;
    background-color: cadetblue;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
  }
</style>
