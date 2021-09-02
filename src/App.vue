<template>
  <Header @openCart="openCart" />

  <Modal v-if="isCartOpened">
    <Cart @close="closeCart" />
  </Modal>

  <Catalog />
</template>

<script>
import "./assets/base-styles.css";
import Header from "./layouts/Header.vue";
import Catalog from "./layouts/Catalog.vue";
import Cart from "./components/Cart.vue";
import Modal from "./UI/Modal.vue";
import * as store from "./store/store.js";

export default {
  name: "App",
  components: {
    Header,
    Cart,
    Catalog,
    Modal,
  },
  data() {
    return {
      isCartOpened: false,
      cart: store.state.cart,
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
