<template>
  <div v-if="errorMessage" class="alert alert-danger">
    <h1>{{ errorMessage }}</h1>
  </div>
  <div class="container" v-if="!errorMessage">
    <div class="decks-wrapper">
      <div class="left-decks">
        <CardField
          v-if="cards"
          :cards="cards"
          :deck-inventory="mainDeck"
          background-color="#5f9ddd"
          name="Main Deck"
          @update-deck="updateDeck"
          class="deck main-deck"
        />
        <CardField
          v-if="cards"
          :cards="cards"
          :deck-inventory="extraDeck"
          background-color="#8f67b8"
          name="Extra Deck"
          @update-deck="updateDeck"
          class="deck extra-deck"
        />
        <CardField
          v-if="cards"
          :cards="cards"
          :deck-inventory="sideDeck"
          background-color="#8c8c8c"
          name="Side Deck"
          @update-deck="updateDeck"
          class="deck side-deck"
        />
      </div>

      <TrunkField
        v-if="cards"
        :cards="cards"
        :deck-inventory="trunkDeck"
        name="Trunk"
        @update-deck="updateDeck"
        class="deck trunk-deck"
      />
    </div>
  </div>
</template>

<script>
import apiClient, { basicAuth, routes } from "@/api/apiClient";
import CardField from "@/components/CardField.vue";
import TrunkField from "@/components/TrunkField.vue";

export default {
  name: "TrunkView",
  components: { CardField, TrunkField },
  data() {
    return {
      username: "",
      cards: null,
      mainDeck: null,
      extraDeck: null,
      sideDeck: null,
      trunkDeck: null,
      errorMessage: null
    };
  },
  methods: {
    updateDeck(deckName, newDeck) {
      console.log(`Updated ${deckName}:`, newDeck);
      this[deckName.toLowerCase().replace(/\s/g, "")] = newDeck;
    }
  },
  async created() {
    try {
      basicAuth();

      this.username = "testUser";
      let response = await apiClient.get(routes.userTrunk + this.username);
      const { cards, trunk } = response.data;

      this.cards = cards;
      this.mainDeck = trunk.main_deck;
      this.extraDeck = trunk.extra_deck;
      this.sideDeck = trunk.side_deck;
      this.trunkDeck = trunk.trunk_deck;
    } catch (error) {
      console.error(error);
      this.errorMessage = "An error occurred";
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
}

.decks-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}

.left-decks {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
}

.deck {
  display: block;
  width: 100%;
}

.main-deck {
  aspect-ratio: 2;
}

.extra-deck,
.side-deck {
  aspect-ratio: 3;
}

.trunk-deck {
  aspect-ratio: 0.5;
  width: 28%;
  max-width: 480px;
}
</style>
