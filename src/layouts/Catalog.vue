<template>
  <div class="catalog" v-if="catalog">
    <CatalogItem
      v-for="good in catalog"
      :key="good.id"
      :good="good"
      @addItem="addToCart"
    />
  </div>
  <div class="catalog" v-else>Catalog is empty...</div>
</template>

<script>
import CatalogItem from "../components/CatalogItem.vue";
import * as store from "../store/store.js";
import { API } from "../config.js";

export default {
  props: ["data"],
  components: {
    CatalogItem,
  },
  data() {
    return {
      catalog: null,
    };
  },
  methods: {
    addToCart(id) {
      store.addToCart(id);
    },
  },
  async mounted() {
    await store.loadCatalogItemsFromDatabase(`${API}/goodsList.json`);
    this.catalog = { ...store.state.goods.burgers };
  },
};
</script>

<style scoped>
.catalog {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  gap: 1rem;
}
</style>