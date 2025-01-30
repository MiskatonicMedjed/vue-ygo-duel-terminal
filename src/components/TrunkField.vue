<template>
  <div class="deck-display" v-drag-and-drop:options="dragOptions">
    <h2>{{ name }}</h2>
    <ul
      :data-id="name"
      @added="onCardAdded"
      @removed="onCardRemoved"
      @reordered="onCardReordered"
      class="card-list"
    >
      <li
        v-for="card in deck"
        :key="card.id"
        :data-id="card.id"
        class="card-item"
      >
        <Card :card="card" />
      </li>
    </ul>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "TrunkField",
  components: { Card },
  props: {
    name: { type: String, required: true },
    deckInventory: { required: true },
    cards: { required: true }
  },
  data() {
    return {
      deck: [],
      dragOptions: {
        dropzoneSelector: "ul",
        draggableSelector: "li",
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true
      }
    };
  },
  methods: {
    processDeck(cards, deckData) {
      return Object.keys(deckData)
        .map((cardId) => {
          const card = cards.find((c) => c.id === parseInt(cardId));
          return card ? { ...card, copies: deckData[cardId] } : null;
        })
        .filter(Boolean);
    },
    onCardAdded(event) {
      const cardId = parseInt(event.ids[0]);
      const card = this.cards.find((c) => c.id === cardId);
      if (card) {
        this.deck.push(card);
        this.$emit("update-deck", this.name, this.deck);
      }
    },
    onCardRemoved(event) {
      this.deck = this.deck.filter((card) => card.id !== parseInt(event.ids[0]));
      this.$emit("update-deck", this.name, this.deck);
    },
    onCardReordered() {
      this.$emit("update-deck", this.name, this.deck);
    }
  },
  created() {
    this.deck = this.processDeck(this.cards, this.deckInventory);
  }
};
</script>


<style lang="scss" scoped>
.deck-display {
  margin: 15px;
  padding: 10px;
  background-color: #d89a4e;
  border: 5px solid #393939;
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

  .card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px; /* Adjust space between cards */
  }

  .card-item {
    width: calc(25% - 5px); /* 5 cards per row with some gap */
    box-sizing: border-box;
  }
}
</style>