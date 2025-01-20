<template>
  <div v-if="errorMessage != null" class="alert alert-danger">
    <h1> {{ errorMessage }}</h1>
  </div>
  <div class="container" v-if="errorMessage === null">
    <h1>Inventory for {{ username }}</h1>
    <card-field v-if="cards != null" :cards="cards" :deck-inventory="mainDeck"   name="Main Deck"  />
    <card-field v-if="cards != null" :cards="cards" :deck-inventory="extraDeck"  name="Extra Deck" />
    <card-field v-if="cards != null" :cards="cards" :deck-inventory="sideDeck"   name="Side Deck"  />
    <card-field v-if="cards != null" :cards="cards" :deck-inventory="trunkDeck"  name="Trunk"      />
  </div>
</template>

<script>
import apiClient, { basicAuth, routes } from "@/api/apiClient";
import CardField from "@/components/CardField.vue";

export default {
  name: "TrunkView",
  components: { CardField },
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
      console.log(error);
      this.errorMessage = "An error occurred";
    }

  },
};
</script>

<style lang="scss" scoped>
.container {
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
