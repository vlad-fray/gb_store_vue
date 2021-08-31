<template>
  <Header @openCart="openCart" />

  <teleport to=".modals" v-if="isCartOpened">
    <div class="modal">
      <Cart @closeCart="closeCart" :data="{ cart }" />
    </div>
    <div @click="closeCart" class="overlay"></div>
  </teleport>

  <Catalog :goods="goods" />
</template>

<script>
import "./assets/base-styles.css";
import Header from "./layouts/Header.vue";
import Catalog from "./layouts/Catalog.vue";
import Cart from "./components/Cart.vue";
import * as store from "./store/store.js";
import { API } from "./store/config.js";

const init = async () => {
  await store.loadCatalogItemsFromDatabase(`${API}/goodsList.json`);
  console.log(store.state);
};
init();

export default {
  name: "App",
  components: {
    Header,
    Cart,
    Catalog,
  },
  data() {
    console.log(store.state.goods);
    return {
      cart: { ...store.state.cart },
      isCartOpened: false,
      goods: { ...store.state.goods },
    };
  },
  methods: {
    openCart() {
      this.isCartOpened = true;
    },
    closeCart() {
      this.isCartOpened = false;
    },
  },
};
</script>

<style>
</style>
