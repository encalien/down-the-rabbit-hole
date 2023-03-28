<script lang="ts">
  export let card;
</script>

<div class="card { card.type }">
  <div class="card-title">{ card.title }</div>
  <div class="card-description">{ card.description }</div>
</div>

<style>
  .card {
    display: block;
    width: 120px;
    height: 180px;
    padding: 0.5rem;
    border: 2px solid black;
    border-radius: 5px;
    color: black;
    text-align: center;
  }

  .attack {
    background-color: lightcoral;
  }
  
  .skill {
    background-color: cadetblue;
  }

  .power {
    background-color: khaki;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
</style>
