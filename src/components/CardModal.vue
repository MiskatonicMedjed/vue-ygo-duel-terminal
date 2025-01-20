<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ card.name }}</h2>
        <button class="close-button" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-image">
          <img :src="card.imageUrl" :alt="card.name" />
        </div>
        <div class="modal-details">
          <ul>
            <li v-for="(value, key) in formattedCardDetails" :key="key" v-if="value !== null">
              <strong>{{ key }}:</strong> {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardModal",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedCardDetails() {
      return {
        "Attack": this.card.atk,
        "Defense": this.card.def,
        "Attribute": this.card.attribute,
        "Level": this.card.level,
        "Description": this.card.desc,
        "Frame Type": this.card.frameType,
        "Card Type": this.card.humanReadableCardType,
        "Race": this.card.race,
        "Type Line": this.card.typeline,
        "Card URL": this.card.ygoprodeck_url,
      };
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 15px;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #343a40;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #495057;
  cursor: pointer;
}

.modal-body {
  display: flex;
  padding: 15px;
}

.modal-image img {
  max-width: 150px;
  border-radius: 8px;
  margin-right: 20px;
}

.modal-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-details li {
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.modal-details li strong {
  color: #343a40;
}
</style>
