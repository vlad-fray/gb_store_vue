<template>
  <header class="header">
    <div class="container header-container">
      <h1 class="header__heading">&#127828; Burger shop</h1>
      <Button :onClick="openCart" class="button--open-cart">&#128722;</Button>
    </div>
  </header>
</template>

<script>
import Button from "../UI/Button.vue";
export default {
  components: {
    Button,
  },
  methods: {
    openCart() {
      this.$emit("openCart");
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.header {
  background-color: var(--color-secondary-bg);
}
.header-container {
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.button--open-cart {
  margin-left: auto;
  padding: 1rem;
}
</style>