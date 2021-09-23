<template>
  <div class="order" v-if="order">
    <div class="burger" v-for="burger in order.burgers" :key="burger.id">
      <img :src="burger.info.imgUrl" alt="burger" />
      <div class="info">
        <h4 class="title">{{ burger.info.title }}</h4>
        <div class="sups" v-if="burger.info.sups.length">
          Suppplements:
          <p class="sup" v-for="sup in burger.info.sups" :key="sup">
            +{{ sup }}
          </p>
        </div>
        <div class="sup" v-if="!burger.info.sups.length">No supplements</div>
      </div>
    </div>
    <div class="add-info">
      <p class="price">Total Price: {{ order.totalPrice.toFixed(2) }}$</p>
      <Button class="button--remove-order" @click="removeOrder">
        Remove Order
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/UI/Button.vue";
export default {
  props: ["order"],
  components: { Button },
  setup({ order }, context) {
    const removeOrder = () => {
      context.emit("removeOrder", order.id);
    };
    return { order, removeOrder };
  },
};
</script>

<style scoped>
.order {
  padding: 10px;
  margin: 10px auto;
  border-radius: 10px;
  border: 2px solid var(--color-main-text);
}
.burger {
  display: flex;
  margin: 20px auto;
  padding: 10px;
  max-width: 600px;
  background-color: var(--color-secondary-bg);
  border-radius: 10px;
}
.burger img {
  width: 100%;
  height: 100%;
  max-height: 150px;
  max-width: 150px;
}
.info {
  height: inherit;
  width: 100%;
  margin-left: 10px;
  padding: 10px;
  background-color: var(--color-main-bg);
}

.info h4 {
  font-size: 24px;
}

.info p {
  font-size: 16px;
  margin-left: 10px;
}

.add-info {
  display: flex;
}

.button--remove-order {
  display: inline-block;
  padding: 5px;
  margin: 0 10px 0 auto;
}
</style>