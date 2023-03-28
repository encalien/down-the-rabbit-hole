<script lang="ts">
	import type { Entity } from '../models/entity';
  import { toSnakeCase } from '../utils';

  export let entity: Entity;
</script>

<div id="entity" class="entity">
  <img src="/src/assets/{ toSnakeCase(entity.name) }.png" alt="{ entity.name }" class="image" draggable="false"/>
  <div class="name">{ entity.name }</div>
  <div class="healthbar">{ entity.currentHealth }/{ entity.maxHealth }</div>
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
    background-color: red;
    font-size: 0.8rem;
    line-height: normal;
    font-weight: bold;
  }
</style>
