<template>
  <div class="order">
    <h3>Order</h3>
    <div class="wrapper" v-if="order">
      <div class="burger" v-for="burger in order.burgers" :key="burger.id">
        {{ burger.info }}
        <img :src="burger.info.imgUrl" alt="burger" />
      </div>
      <p>Price: {{ order.totalPrice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  setup({ order }) {
    console.log(order);
    return { order };
  },
};
</script>

<style>
.burger img {
  height: 50px;
  width: 50px;
}
</style>