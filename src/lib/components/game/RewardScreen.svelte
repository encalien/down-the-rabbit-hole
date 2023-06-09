<script lang="ts">
  import Card from './Card.svelte';
  import Potion from './Potion.svelte';
  import type { Game } from '../../models/game';
  import type { Card as CardType } from '../../models/card';
  import type { Potion as PotionType } from '../../models/potion';
  import { cardCollection } from '../../../server/cards_collection';
  import { potionCollection } from '../../../server/potions_collection';
  import { generateRandomNumber } from '../../utils';

  export let game: Game;
  export let accessorObject: any;
  let availableCards: CardType[] = [];
  let selectedCard: CardType;
  let selectedRewardType: string;
  let potion: PotionType;
  let selectedPotion: PotionType;

  function showAvaliableCards(n: number): void {
    selectedRewardType = "add-card";
    const offeredCardsIndices = [];
    for (let i = 0; i < n; i++) {
      const randIndex = generateRandomNumber(cardCollection.length, offeredCardsIndices);
      offeredCardsIndices.push(randIndex);
      const card: CardType = cardCollection[randIndex]; 
      availableCards.push(card);
    }
    availableCards = availableCards;
  }

  function showDeckCards(): void {
    selectedRewardType = "remove-card";
    availableCards = game.deck;
  }
  
  function showPotions(n): void {
    selectedRewardType = "add-potion";
    for (let i = 0; i < n; i++) {
      const randIndex = Math.floor(Math.random() * potionCollection.length);
      potion = potionCollection[randIndex]; 
    }
  }

  function selectCard(card: CardType): void {
    selectedCard = card;
  }

  function selectPotion(): void {
    selectedPotion = potion;
  }
  
  function processRewards() {
    switch (selectedRewardType) {
      case "add-card":
        game.addCardToDeck(selectedCard);
        availableCards = [];
        break;
      case "remove-card":
        game.removeCardFromDeck(selectedCard);
        availableCards = [];
        break;
      case "add-potion":
        game.addPotion(selectedPotion);
        potion = null;
        break;
    }
    accessorObject.updateGame(game);
    game.startLevel();
  }
</script>

<div class="main-container">
  {#if game.disableRewards}
    <p>You escaped...</p>
  {:else}
    <div class="rewards-container" class:hidden={ availableCards.length || potion }>
      <button class="btn" on:click={ () => showAvaliableCards(3) }>Add a card</button>
      <button class="btn" on:click={ showDeckCards }>Remove a card</button>
      <button class="btn" on:click={ () => showPotions(1) }>Take a potion</button>
    </div>
    <div class="overflow-container">
      <div class="{ selectedRewardType }">
        {#each availableCards as card}
          <div on:click={ () => selectCard(card) } on:keydown={ () => selectCard(card) }>
            <Card { card } { accessorObject } playable={ false } className={ selectedCard === card ? 'card-selected' : '' } />
          </div>
        {/each}
        {#if potion}
          <div on:click={ selectPotion } on:keydown={ selectPotion }>
            <Potion { game } { potion } { accessorObject } />
          </div>
        {/if}
      </div>
    </div>
  {/if}
  <button class="btn" on:click={ processRewards }>Continue</button>
</div>

<style>
  .main-container {
    /* vieport - header height */ 
    height: calc(100vh - 40px); 
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgb(28, 46, 46);
    align-items: center;
  }

  .overflow-container {
    margin: 0 auto;
    width: 70%;
    height: 65%;
    overflow: hidden;
  }
  
  .rewards-container, .add-card {
    display: flex;
    width: 50%;
    gap: 60px;
    justify-content: space-between;
    padding: 20px 160px;
  }

  .remove-card {
    display: grid;
    grid: repeat(auto-fill, 200px) / repeat(auto-fill, 140px);
    gap: 20px;
    justify-content: space-between;
    align-items: start;
    overflow: auto;
    height: 100%;
    padding-right: 50px;
    width: calc(100% + 20px);
  }

  .add-potion {
    display: flex;
    gap: 60px;
    justify-content: center;
    padding: 20px 160px;
  }

  .rewards-container > .btn {
    flex: 1 0 0;
  }

  .overflow-container :global(.card) {
    cursor: pointer;
	}

  .overflow-container :global(.potion > button) {
    cursor: pointer;
	}

  .overflow-container :global(.potion-image) {
    height: 100px;
	}
</style>
