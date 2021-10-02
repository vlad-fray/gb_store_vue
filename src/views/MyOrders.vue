<template>
  <div class="orders">
    <div v-if="orders">
      <Order
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @removeOrder="removeOrder"
      />
    </div>
    <div v-else>You did not do any orders</div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { onMounted } from "@vue/runtime-core";
import Order from "@/components/Order.vue";
export default {
  components: { Order },
  setup() {
    const store = useStore();

    const ordersList = computed(() => {
      return store.state.orders.map((order) => {
        const { id } = order;
        const { goods, totalPrice } = order.orderData;
        return { id, goods, totalPrice };
      });
    });

    const orders = computed(() => {
      return ordersList.value.map((order) => {
        const { id, totalPrice } = order;
        const burgers = order.goods.map((burger) => {
          const { id } = burger;
          const { imgUrl, title } = burger.item;
          const sups = burger.supplements.map((sup) => sup.title);
          return { id, info: { title, imgUrl, sups } };
        });
        return { id, totalPrice, burgers };
      });
    });

    const removeOrder = (id) => {
      console.log(id);
      store.commit("removeOrder", { id });
    };

    onMounted(() => {
      store.commit("loadOrders");
    });
    return { orders, removeOrder };
  },
};
</script>

<style>
.orders {
  max-width: 800px;
  margin: 0 auto;
  padding: 10px 20px;
}
</style>