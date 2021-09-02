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

export default {
  props: ["data"],
  components: {
    CatalogItem,
  },
  data() {
    // console.log(this.data.burgers);
    return {
      catalog: this.data.burgers,
    };
  },
  methods: {
    addToCart(id) {
      this.$emit("addToCart", id);
    },
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