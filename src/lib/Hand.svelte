<script>
  import Card from "./Card.svelte";

  let hand = [
  {
    type: 'attack',
    title: "Strike",
    description: "Deal 6 damage.",
    imgSrc: ""
  },
  {
    type: 'skill',
    title: "Defend",
    description: "Gain 5 block.",
    imgSrc: ""
  },
  {
    type: 'power',
    title: "Deep pockets",
    description: "Draw one more card.",
    imgSrc: ""
  }
]
</script>

<div id="hand">
  {#each hand as card}
    <Card card={ card } />
  {/each}
</div>

<style>
  #hand {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
  }
</style>
