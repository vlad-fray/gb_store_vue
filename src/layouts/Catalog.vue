<template>
  <div class="catalog" v-if="catalog && catalog.length">
    <CatalogItem
      v-for="good in catalog"
      :key="good.id"
      :good="good"
      @addItem="addToCart"
    />
  </div>
  <div class="catalog" v-else-if="catalog && !catalog.length">
    <h3>No matching products...</h3>
  </div>
  <div class="catalog" v-else>Catalog is empty...</div>
</template>

<script>
import CatalogItem from "@/components/CatalogItem.vue";
import { computed, ref } from "@vue/reactivity";

export default {
  props: ["catalog"],
  components: {
    CatalogItem,
  },
  setup(props, context) {
    const addToCart = (id) => {
      context.emit("addToCart", id);
    };

    return { addToCart };
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