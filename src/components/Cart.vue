<template>
  <div v-if="!isOrdering && !madeOrder" class="cart">
    <div class="cart__content">
      <div v-if="goods.length">
        <CartItem
          @removeItem="removeCartItem"
          @toggleSup="toggleSupMeal"
          v-for="good in goods"
          :good="good"
          :key="good"
        />
        <h4 class="cart__price">
          Total price: {{ cart.totalPrice.toFixed(2) }}$
        </h4>
        <h4 class="cart__price">
          Total calorie: {{ cart.totalCal.toFixed(2) }} cal
        </h4>
      </div>
      <h3 v-else>Cart is empty</h3>
    </div>
    <div class="cart__actions">
      <Button
        v-if="goods.length"
        @onClick="openOrderingForm"
        class="button--cart-ordering"
      >
        Order
      </Button>
      <Button @onClick="closeCart" class="button--cancel-cart"> Cancel </Button>
    </div>
  </div>

  <div v-else-if="!madeOrder" class="cart">
    <h4 class="cart__price">Total price: {{ cart.totalPrice.toFixed(2) }}$</h4>
    <h4 class="cart__price">
      Total calorie: {{ cart.totalCal.toFixed(2) }} cal
    </h4>
    <CartOrderForm
      v-if="isOrdering"
      @submitForm="submitOrderingForm"
      @closeForm="closeOrderingForm"
    />
  </div>

  <div v-else class="cart">
    <h4 class="cart__message">You made an order, wait for a call!</h4>
    <Button class="button--close-cart" @onClick="closeCart">Close</Button>
  </div>
</template>

<script>
import CartOrderForm from "./CartOrderForm.vue";
import CartItem from "./CartItem.vue";
import Button from "../UI/Button.vue";
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";

export default {
  components: {
    CartOrderForm,
    CartItem,
    Button,
  },
  setup(props, context) {
    const store = useStore();
    const cart = computed(() => store.getters.getCart);
    const goods = computed(() => store.getters.getCartGoods);

    const isOrdering = ref(false);
    const madeOrder = ref(false);

    const closeCart = () => {
      context.emit("closeCart");
    };

    const removeCartItem = (itemId) => {
      store.dispatch("REMOVE_CART_ITEM", { itemId });
    };

    const toggleSupMeal = (burgerId, supId) => {
      store.dispatch("TOGGLE_SUP_MEAL", { burgerId, supId });
    };

    const openOrderingForm = () => {
      isOrdering.value = true;
    };
    const closeOrderingForm = () => {
      isOrdering.value = false;
    };

    const submitOrderingForm = async (userData) => {
      store.dispatch("SUBMIT_ORDER", userData);
      isOrdering.value = false;
      madeOrder.value = true;
    };

    onMounted(() => {
      store.dispatch("LOAD_CART");
    });

    onUpdated(() => {
      // console.log("cart updated");
    });

    return {
      cart,
      goods,
      isOrdering,
      madeOrder,
      closeCart,
      removeCartItem,
      openOrderingForm,
      closeOrderingForm,
      toggleSupMeal,
      submitOrderingForm,
    };
  },
};
</script>

<style scoped>
.cart {
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;
}

.cart__actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.cart__message {
  margin: 1rem;
}

.button--cancel-cart {
  padding: 1rem;
}
.button--close-cart {
  padding: 1rem;
  display: block;
  margin-left: auto;
}

.button--cart-ordering {
  margin: 0 1rem;
  padding: 1rem;
  color: white;
  background-color: var(--color-accent);
}

.button--cart-ordering:hover {
  color: var(--color-accent);
  background-color: white;
  box-shadow: 0 0 0 1px var(--color-accent);
}
</style>