<template>
  <div class="extra-deck-container">
    <h1>Trunk for {{ username }}</h1>
    <ul>
      <li v-for="card in extraDeck" :key="card.id" class="card-item">
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
import axios from "axios";

export default {
  name: "TrunkView",
  data() {
    return {
      username: "",
      extraDeck: [],
    };
  },
  async created() {
    try {
      this.username = "boloplayer";
      const response = await axios.get(`/api/cards?username=${this.username}`);
      const { cards, trunk } = response.data;
      this.processExtraDeck(cards, trunk.extra_deck);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  },
  methods: {
    processExtraDeck(cards, extraDeckData) {
      this.extraDeck = Object.keys(extraDeckData)
        .map((cardId) => {
          const card = cards.find((c) => c.id === parseInt(cardId));
          if (card) {
            return {
              ...card,
              copies: extraDeckData[cardId],
            };
          }
          return null;
        })
        .filter(Boolean); // Remove any null values if cards are not found
    },
  },
};
</script>

<style lang="scss" scoped>
.extra-deck-container {
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
