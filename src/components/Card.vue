<template>
  <div class="card-wrapper" @click="openModal">
    <img :src="card.imageUrl" :alt="card.name" class="card-image" />
    <div class="card-copies">{{ card.copies }}</div>

    <CardModal
      v-if="showModal"
      :card="card"
      @close="closeModal"
    />
  </div>
</template>

<script>
import CardModal from './CardModal.vue';

export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false; // Ensure this method properly toggles the modal visibility
    },
  },
  components: {
    CardModal,
  },
};
</script>

<style scoped>
.card-wrapper {
  position: relative;
  cursor: pointer;
  display: inline-block;

  .card-image {
    width: 100px;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .card-image:hover {
    transform: scale(1.05);
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
</style>
