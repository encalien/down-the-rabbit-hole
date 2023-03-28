<script lang="ts">
	import type { Entity } from '../models/entity';
  import { toSnakeCase } from '../utils';

  export let entity: Entity;
  export let accessorObject: any;
</script>

<div id="entity" class="entity">
  <img src="/src/assets/{ toSnakeCase(entity.name) }.png" alt="{ entity.name }" class="image" draggable="false"/>
  <div class="name">{ entity.name }</div>
  <div class="healthbar">
    <span class="block">{ entity.block }</span>
    { entity.currentHealth }/{ entity.maxHealth }
  </div>
</div>

<style>
  .entity {
    display: flex;
    flex-direction: column;
    height: 350px;
    padding: 0.5rem;
    text-align: center;
    justify-content: space-between;
  }

  .image {
    height: 300px;
  }
  
  .name {
    font-weight: bold;
  }
  
  .healthbar {
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
