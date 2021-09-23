<template>
  <div class="orders">
    <h1>My orders</h1>
    <div v-if="orders">
      <Order v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";
import Order from "@/components/Order.vue";
export default {
  components: { Order },
  setup() {
    const store = useStore();
    const myOrders = computed(() =>
      store.state.orders.map((order) => order.orderData.goods)
    );

    const orders = computed(() => {
      return myOrders.value.map((burgersList) => {
        const burgers = burgersList.map((burger) => {
          const { id } = burger;
          const { imgUrl, title, price } = burger.item;
          const sups = burger.supplements.map((sup) => ({
            title: sup.title,
            price: sup.price,
          }));
          return { id, info: { title, price, imgUrl, sups } };
        });
        return burgers;
      });
    });

    onMounted(() => {
      store.commit("loadOrders");
    });
    return { orders };
  },
};
</script>

<style>
.orders {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}
</style>