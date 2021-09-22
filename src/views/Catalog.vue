<template>
  <Header @onInputChange="changeFilteredGoods" @openCart="openCart" />

  <Modal v-if="isCartOpened" @closeModal="closeCart">
    <Cart @close="closeCart" @submitOrder="submitOrder" :data="cart" />
  </Modal>

  <Catalog v-if="goods" @addToCart="addToCart" :catalog="filteredGoods" />
  <NotFound v-if="serverError" />
</template>

<script>
import "@/assets/base-styles.css";
import Header from "@/layouts/Header.vue";
import Catalog from "@/layouts/Catalog.vue";
import Cart from "@/components/Cart.vue";
import Modal from "@/UI/Modal.vue";
import NotFound from "@/layouts/NotFound.vue";
import { API } from "@/config.js";
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Home",
  components: { Header, Catalog, Cart, Modal, NotFound },
  setup() {
    const serverError = ref(false);
    const isCartOpened = ref(false);
    const searchValue = ref("");
    const goods = ref(null);
    const cart = ref({
      totalPrice: 0,
      totalCal: 0,
      isOrdering: false,
      goods: [],
    });

    const filteredGoods = computed(() => {
      if (!goods.value?.burgers) return null;
      return goods.value.burgers.filter((good) => {
        return good.title
          .toLowerCase()
          .includes(searchValue.value.toLowerCase());
      });
    });

    const openCart = () => {
      isCartOpened.value = true;
    };

    const closeCart = () => {
      isCartOpened.value = false;
    };

    const changeFilteredGoods = (value) => {
      searchValue.value = value.toLowerCase();
    };

    const loadCatalogItemsFromDatabase = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        goods.value = data;
        // changeFilteredGoods("");
      } catch (err) {
        serverError.value = true;
        console.error(err);
      }
    };

    const loadCartItemsFromDatabase = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.goods.length) return;
        cart.value = data;
        // changeFilteredGoods("");
      } catch (err) {
        serverError.value = true;
        console.error(err);
      }
    };

    const addToCart = async (id) => {
      const currentGood = goods.value.burgers.find(
        (burger) => burger.id === id
      );

      const supplements = goods.value.supplements.toBurgers.map((sup) => {
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

      cart.value = {
        ...cart.value,
        totalPrice: cart.value.totalPrice + currentGood.price,
        totalCal: cart.value.totalCal + currentGood.cal,
        goods: [...cart.value.goods, newCartItem],
      };

      await fetch(API + "cart/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart.value),
      });
    };

    const submitOrder = async (userData) => {
      const goods = cart.value.goods.map((good) => {
        const supplements = good.supplements.filter((sup) => sup.isAdded);
        console.log(good);
        return {
          id: good.id,
          item: good.item,
          supplements: [...supplements],
          price: good.itemPrice,
        };
      });
      const newOrdersListItem = {
        userData,
        orderData: {
          goods,
          totalPrice: cart.value.totalPrice,
        },
      };

      await fetch(API + "ordersList/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrdersListItem),
      });

      await fetch(API + "cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalPrice: 0,
          totalCal: 0,
          isOrdering: false,
          goods: [],
        }),
      });

      cart.value = {
        totalPrice: 0,
        totalCal: 0,
        isOrdering: false,
        goods: [],
      };
    };

    onMounted(async () => {
      loadCatalogItemsFromDatabase(API + "goodsList/");
      loadCartItemsFromDatabase(API + "cart/");
    });

    return {
      cart,
      goods,
      serverError,
      isCartOpened,
      searchValue,
      filteredGoods,
      openCart,
      closeCart,
      changeFilteredGoods,
      loadCatalogItemsFromDatabase,
      loadCartItemsFromDatabase,
      addToCart,
      submitOrder,
    };
  },
};
</script>
