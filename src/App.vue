<template>
  <Header @openCart="openCart" />

  <Modal v-if="showCart" @closeModal="closeCart">
    <Cart @closeCart="closeCart" />
  </Modal>
  <router-view />
</template>

<script>
import Header from "@/layouts/Header.vue";
import Cart from "@/components/Cart.vue";
import Modal from "@/UI/Modal.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  components: { Header, Cart, Modal },
  setup() {
    const store = useStore();
    const showCart = computed(() => store.state.showCart);

    const openCart = () => {
      store.commit("OPEN_CART");
    };

    const closeCart = () => {
      store.commit("CLOSE_CART");
    };

    return { showCart, openCart, closeCart };
  },
};
</script>

<style>
</style>
