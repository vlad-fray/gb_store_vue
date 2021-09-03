<template>
  <Header @openCart="openCart" @onInputChange="changeFilteredGoods" />

  <Modal v-if="isCartOpened" @closeModal="closeCart">
    <Cart @close="closeCart" @submitOrder="submitOrder" :data="state.cart" />
  </Modal>

  <Catalog v-if="state.goods" @addToCart="addToCart" :data="filteredGoods" />
  <NotFound v-if="serverError" />
</template>

<script>
import "./assets/base-styles.css";
import Header from "./layouts/Header.vue";
import Catalog from "./layouts/Catalog.vue";
import Cart from "./components/Cart.vue";
import Modal from "./UI/Modal.vue";
import NotFound from "./layouts/NotFound.vue";
import { API } from "./config.js";

export default {
  name: "App",
  components: {
    Header,
    Cart,
    Catalog,
    Modal,
    NotFound,
  },
  data() {
    return {
      serverError: false,
      isCartOpened: false,
      searchValue: "",
      filteredGoods: null,
      state: {
        goods: null,
        cart: { totalPrice: 0, totalCal: 0, isOrdering: false, goods: [] },
        orderList: [],
      },
    };
  },
  async mounted() {
    await this.loadCatalogItemsFromDatabase(`${API}/goodsList.json`);
  },

  methods: {
    openCart() {
      this.isCartOpened = true;
    },
    closeCart() {
      this.isCartOpened = false;
    },

    changeFilteredGoods(value) {
      this.searchValue = value;
      this.filteredGoods = this.state.goods.burgers.filter((good) => {
        return good.title
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      });
    },

    async loadCatalogItemsFromDatabase(url) {
      try {
        const res = await fetch(url);
        const data = await res.json();

        this.state.goods = data;
        this.changeFilteredGoods("");
      } catch (err) {
        this.serverError = true;
        console.error(err);
      }
    },

    addToCart(id) {
      const currentGood = this.state.goods.burgers.find(
        (burger) => burger.id === id
      );

      const supplements = this.state.goods.supplements.toBurgers.map((sup) => {
        return {
          ...sup,
          isAdded: false,
        };
      });

      const ranNum = Math.floor(Math.random() * 500);

      const newCartItem = {
        id: `burger${ranNum}`,
        item: currentGood,
        supplements: [...supplements],
        itemPrice: currentGood.price,
        itemCal: currentGood.cal,
      };

      this.state.cart = {
        ...this.state.cart,
        totalPrice: this.state.cart.totalPrice + currentGood.price,
        totalCal: this.state.cart.totalCal + currentGood.cal,
        goods: [...this.state.cart.goods, newCartItem],
      };
    },

    submitOrder(userData) {
      const orderId = Math.floor(Math.random() * 10000);
      this.state.orderList.push({
        id: orderId,
        userData,
        orderData: {
          goods: this.state.cart.goods,
          totalPrice: this.state.cart.totalPrice,
        },
      });
      this.state.cart = {
        totalPrice: 0,
        totalCal: 0,
        isOrdering: false,
        goods: [],
      };
    },
  },
};
</script>

<style>
</style>
