<template>
  <div class="deck-display">
    <h2>{{ name }}</h2>
    <ul>
      <li v-for="card in deck" :key="card.id" class="card-item">
        <card :card="card"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "CardField",
  components: { Card },
  props: {
    name: {
      type: String,
      required: true
    },
    deckInventory: {
      required: true
    },
    cards: {
      required: true
    }
  },
  data() {
    return {
      deck: null,
    };
  },
  methods: {
    processDeck(cards, deckData) {
      return Object.keys(deckData)
        .map((cardId) => {
          const card = cards.find((c) => c.id === parseInt(cardId));
          if (card) {
            return {
              ...card,
              copies: deckData[cardId],
            };
          }
          return null;
        })
        .filter(Boolean); // Remove any null values if cards are not found
    },
  },
  async created() {
    this.deck = this.processDeck(this.cards, this.deckInventory);
  },
}
</script>

<style lang="scss" scoped>
.deck-display {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    color: #343a40;
  }

  ul {
    list-style: none;
    padding: 0;

    .card-item {
      position: relative;
      display: inline-block;
      margin: 10px;

      .card-wrapper {
        position: relative;
        display: inline-block;

        .card-image {
          width: 100px;
          height: auto;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .card-copies {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: white;
          color: #495057;
          font-size: 0.8rem;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 50%;
          border: 1px solid #dee2e6;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>