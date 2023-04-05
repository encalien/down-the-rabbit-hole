<script lang="ts">
  import Card from './Card.svelte';
  import type { Game } from '../../models/game';
  import { Card as CardType } from '../../models/card';
  import { cardCollection } from '../../../server/cards_collection';

  export let game: Game;
  export let accessorObject: any;
  let availableCards: CardType[] = [];
  let selectedCard: CardType;
  let selectedRewardType: string;

  // function endTurn() {
  //   game.endTurn();
  //   accessorObject.updateGame(game);
  // }

  function showAvaliableCards(n: number): void {
    selectedRewardType = "add_card";
    for (let i = 0; i < n; i++) {
      const randIndex = Math.floor(Math.random() * cardCollection.length);
      const card = cardCollection[randIndex]; 
      availableCards.push(new CardType(card.type, card.title, card.description, card.cost, card.effects));
    }
    availableCards = availableCards;
  }

  function selectCard(card: CardType): void {
    selectedCard = card;
  }
  
  function processRewards() {
    switch (selectedRewardType) {
      case "add_card":
        game.addCardToDeck(selectedCard);
        availableCards = [];
        break;
      case "remove_card":
        game.removeCardFromDeck(selectedCard);
        break;
      case "add_potion":
        break;
    }
    game.startLevel();
    accessorObject.updateGame(game);
  }
</script>

<div class="main-container">
  <div class="rewards-container" class:hidden={ availableCards.length }>
    <button class="btn" on:click={ () => showAvaliableCards(3) }>Add a card</button>
    <button class="btn">Remove a card</button>
    <button class="btn">Take a potion</button>
  </div>
  <div class="rewards-container">
    {#each availableCards as card}
      <div on:click={ () => selectCard(card) } on:keydown={ () => selectCard(card) }>
        <Card { card } { accessorObject } playable={ false } className={ selectedCard === card ? 'card-selected' : '' } />
      </div>
    {/each}
  </div>
  <button class="btn" on:click={ processRewards }>Continue</button>
</div>

<style>
  .main-container {
    /* vieport - header height */ 
    height: calc(100vh - 40px); 
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: rgb(28, 46, 46);
    align-items: center;
  }
  
  .rewards-container {
    display: flex;
    width: 50%;
    gap: 60px;
    justify-content: space-between;
    padding: 20px 160px;
  }

  .rewards-container > .btn {
    flex: 1 0 0;
  }

  .rewards-container :global(.card) {
    cursor: pointer;
	}
</style>
