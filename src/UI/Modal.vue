<template>
  <teleport to=".modals">
    <div class="modal">
      <slot></slot>
    </div>
    <div @click="closeModal" class="overlay"></div>
  </teleport>
</template>

<script>
export default {
  emits: ["closeModal"],
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
.overlay {
  content: "";
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.modal {
  content: "";
  position: fixed;
  z-index: 2;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 1600px;
  max-height: 80%;
  overflow-y: scroll;
}
</style>