<template>
  <div class="catalog" v-if="!isEmpty">
    <CatalogItem />
  </div>
</template>

<script>
import CatalogItem from "../components/CatalogItem.vue";
export default {
  props: ["data"],
  components: {
    CatalogItem,
  },
  data() {
    return {
      goods: this.data.goods,
      isEmpty: !this.data.goods.length,
    };
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