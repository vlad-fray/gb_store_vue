<template>
  <header class="header">
    <div class="container header-container">
      <h1 class="header__heading">&#127828; Burger shop</h1>
      <input
        v-model="searchValue"
        @keyup="onInputChange"
        type="text"
        class="input"
        placeholder="&#x1F50E;"
        maxlength="50"
      />
      <Button @onClick="openCart" class="button--open-cart">&#128722;</Button>
    </div>
  </header>
</template>

<script>
import Button from "../UI/Button.vue";
export default {
  emits: ["openCart", "onInputChange"],
  components: {
    Button,
  },
  methods: {
    openCart() {
      this.$emit("openCart");
    },
    onInputChange() {
      this.$emit("onInputChange", this.searchValue);
    },
  },
  data() {
    return {
      searchValue: "",
    };
  },
};
</script>

<style scoped>
.header {
  background-color: var(--color-secondary-bg);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.26);
}
.header-container {
  min-height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.button--open-cart {
  /* margin-left: auto; */
  padding: 1rem;
}
.input {
  height: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--color-main-bg);
  max-width: 15rem;
  width: 100%;
  padding: 0 1rem;
  margin: 0 2rem 0 auto;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.26);
}
</style>