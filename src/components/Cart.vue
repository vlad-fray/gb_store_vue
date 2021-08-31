<template>
  <div class="cart">
    <div class="cart__content">
      <h3 v-if="!isOrdering && isEmptyCart">Cart is empty</h3>
    </div>
    <div class="cart__actions">
      <Button class="button--cart-ordering">Order</Button>
      <Button :onClick="closeCart" class="button--cancel-cart">Cancel</Button>
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
      this.$emit("closeCart");
    },
  },
  data() {
    return {
      isOrdering: this.data.cart.isOrdering,
      isEmptyCart: !this.data.cart.goods.length,
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