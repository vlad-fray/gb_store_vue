<template>
  <div v-if="!isOrdering && !madeOrder" class="cart">
    <div class="cart__content">
      <div v-if="cart.goods.length">
        <CartItem
          @removeItem="removeItemFromCart"
          @toggleSup="toggleSupMeal"
          v-for="good in cart.goods"
          :key="good.id"
          :data="good"
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
      <button @click="openOrderingForm" class="button button--cart-ordering">
        Order
      </button>
      <button @click="closeCart" class="button button--cancel-cart">
        Cancel
      </button>
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
    <button class="button button--close-cart" @click="closeCart">Close</button>
  </div>
</template>

<script>
import CartOrderForm from "./CartOrderForm.vue";
import CartItem from "./CartItem.vue";

export default {
  props: ["data"],
  components: {
    CartOrderForm,
    CartItem,
  },
  methods: {
    closeCart() {
      this.$emit("close");
    },
    toggleSupMeal(burgerId, supId) {
      const currentItem = this.cart.goods.find(
        (burger) => burger.id === burgerId
      );

      const currentSup = currentItem.supplements.find(
        (sup) => sup.id === supId
      );

      if (currentSup.isAdded) {
        this.cart.totalPrice -= currentSup.price;
        currentItem.itemPrice -= currentSup.price;
        this.cart.totalCal -= currentSup.cal;
        currentItem.itemCal -= currentSup.cal;
      } else {
        this.cart.totalPrice += currentSup.price;
        currentItem.itemPrice += currentSup.price;
        this.cart.totalCal += currentSup.cal;
        currentItem.itemCal += currentSup.cal;
      }

      currentSup.isAdded = !currentSup.isAdded;
    },
    removeItemFromCart(itemId) {
      const itemToDelete = this.cart.goods.find((good) => good.id === itemId);
      this.cart.totalPrice -= itemToDelete.itemPrice;
      this.cart.totalCal -= itemToDelete.itemCal;

      this.cart.goods = this.cart.goods.filter((good) => good.id !== itemId);
    },
    openOrderingForm() {
      this.isOrdering = true;
    },
    closeOrderingForm() {
      this.isOrdering = false;
    },
    submitOrderingForm(userData) {
      this.$emit("submitOrder", userData);
      this.isOrdering = false;
      this.madeOrder = true;
    },
  },
  data() {
    // console.log(this.data);
    return {
      cart: this.data,
      isEmptyCart: true,
      isOrdering: false,
      madeOrder: false,
    };
  },
  mounted() {
    this.cart = this.data;
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
}
</style>