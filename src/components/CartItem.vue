<template>
  <div class="cart-item" :data-id="good.id">
    <h3 class="cart-item__title">
      {{ good.item.title }}
      <Button @onClick="removeItem" class="button--remove-item">
        &#215;
      </Button>
    </h3>
    <p class="cart-item__info">{{ good.item.price }}$</p>
    <p class="cart-item__info">{{ good.item.cal }} cal</p>

    <div class="cart-item__supplements">
      <h4>Add it to your burger:</h4>
      <div>
        <p
          v-for="sup in good.supplements"
          :key="sup.id"
          class="cart-item__supplement"
          :data-id="sup.id"
        >
          <span>{{ sup.title }} </span>
          <span>{{ sup.price }}$ </span>
          <span>{{ sup.cal }} cal </span>
          <Button
            @onClick="toggleSup(sup.id)"
            class="cart-toggle__button"
            :class="sup.isAdded ? 'cart-toggle__button--marked' : ''"
            type="button"
          >
            &#10003;
          </Button>
        </p>
      </div>
    </div>

    <h4 class="cart-item__total">
      Burger price: {{ good.itemPrice.toFixed(2) }}$
    </h4>
    <h4 class="cart-item__total">
      Burger calorie: {{ good.itemCal.toFixed(2) }} cal
    </h4>
  </div>
</template>

<script>
import Button from "../UI/Button.vue";

export default {
  props: ["data"],
  components: { Button },
  data() {
    // console.log(this.data);
    return {
      good: this.data,
    };
  },
  methods: {
    toggleSup(supId) {
      this.$emit("toggleSup", this.good.id, supId);
    },
    removeItem() {
      this.$emit("removeItem", this.good.id);
    },
  },
};
</script>

<style scoped>
.cart-item {
  width: 95%;
  margin: 0 auto 1rem;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px 0 var(--color-secondary-bg);
}

.cart-item__info {
  text-align: right;
}

.cart-item__title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.cart-item__supplements {
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
}

.cart-item__supplement {
  margin-bottom: 0.2rem;
  min-width: 12rem;
  text-align: right;
}

.button--remove-item {
  padding: 0.1rem 0.5rem;
}

.cart-toggle__button {
  padding: 0.1rem 0.5rem;
}
.cart-toggle__button--marked {
  color: white;
  background-color: var(--color-main-text);
}
</style>