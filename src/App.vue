<template>
  <Header @openCart="openCart" />

  <Modal @close="closeCart" v-if="isCartOpened">
    <Cart @closeCart="closeCart" :data="{ cart }" />
  </Modal>

  <!-- <Catalog :goods="goods" /> -->
</template>

<script>
import "./assets/base-styles.css";
import Header from "./layouts/Header.vue";
import Catalog from "./layouts/Catalog.vue";
import Cart from "./components/Cart.vue";
import Modal from "./UI/Modal.vue";
import * as store from "./store/store.js";
import { API } from "./config.js";

// const init = async () => {
//   await store.loadCatalogItemsFromDatabase(`${API}/goodsList.json`);
//   console.log(store.state);
// };
// init();

export default {
  name: "App",
  components: {
    Header,
    Cart,
    Catalog,
    Modal,
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
