<template>
  <div class="deck-display">
    <h2>{{ name }}</h2>
    <ul>
      <li v-for="card in deck" :key="card.id" class="card-item">
        <img :src="card.imageUrl" :alt="card.name" class="card-image" />
        <div class="card-details">
          <h2>{{ card.name }}</h2>
          <p>{{ card.desc }}</p>
          <p><strong>Copies:</strong> {{ card.copies }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DeckDisplay",
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

  h1 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    color: #343a40;
  }

  ul {
    list-style: none;
    padding: 0;

    .card-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      background-color: #ffffff;

      .card-image {
        width: 100px;
        height: auto;
        margin-right: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .card-details {
        h2 {
          font-size: 1.25rem;
          margin: 0 0 10px;
          color: #495057;
        }

        p {
          margin: 0 0 5px;
          color: #6c757d;
        }

        strong {
          color: #212529;
        }
      }
    }
  }
}
</style>