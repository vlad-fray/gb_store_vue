<template>
  <div class="order">
    <h3>Order</h3>
    <p>{{ order }}</p>
  </div>
</template>

<script>
export default {
  props: ["order"],
  setup({ order }) {
    return { order };
  },
};
</script>

<style>
</style>