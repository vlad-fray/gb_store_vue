<template>
  <div class="cart">
    <div class="cart__content">
      <h3 v-if="isEmptyCart">Cart is empty</h3>
    </div>
    <div class="cart__actions">
      <button class="button button--cart-ordering">Order</button>
      <button @click="closeCart" class="button button--cancel-cart">
        Cancel
      </button>
    </div>
  </div>
  <CartOrderForm />
</template>

<script>
import Button from "../UI/Button.vue";
import CartOrderForm from "./CartOrderForm.vue";

export default {
  props: ["data", "isOpened"],
  components: {
    CartOrderForm,
    Button,
  },
  methods: {
    closeCart() {
      this.$emit("close");
    },
  },
  data() {
    return {
      isOrdering: false,
      isEmptyCart: true,
    };
  },
  mounted() {},
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
  display: flex;
  justify-content: flex-end;
}

.button--cancel-cart {
  padding: 1rem;
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