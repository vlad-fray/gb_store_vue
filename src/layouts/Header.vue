<template>
  <header class="header">
    <div class="container header-container">
      <h1 class="header__heading">&#127828; Burger shop</h1>
      <div class="links">
        <router-link :to="{ name: 'Catalog' }">Catalog</router-link>
        <router-link :to="{ name: 'MyOrders' }">MyOrders</router-link>
      </div>
      <Button @onClick="openCart" class="button--open-cart">&#128722;</Button>
    </div>
  </header>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import Button from "../UI/Button.vue";
export default {
  emits: ["openCart"],
  components: {
    Button,
  },
  setup(props, context) {
    const store = useStore();
    const searchValue = computed(() => store.state.searchValue);

    const openCart = () => {
      context.emit("openCart");
    };

    return { searchValue, openCart };
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
  margin-left: auto;
  padding: 1rem;
}
.links {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  border-radius: 5px;
}

.links a {
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.links a.router-link-active {
  background-color: var(--color-secondary-bg);
  color: var(--color-main-text);
  cursor: default;
}

.links a:not(.router-link-active) {
  background-color: var(--color-main-text);
}
</style>