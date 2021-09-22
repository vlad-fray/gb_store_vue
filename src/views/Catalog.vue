<template>
  <div class="filtering">
    <h3>Write a name of burger:</h3>
    <input
      v-model="searchValue"
      @keyup="onInputChange"
      type="text"
      class="input"
      placeholder="&#x1F50E;"
      maxlength="50"
    />
  </div>
  <div class="catalog" v-if="filteredBurgers && filteredBurgers.length">
    <CatalogItem
      v-for="good in filteredBurgers"
      :key="good.id"
      :good="good"
      @addItem="addToCart"
    />
  </div>
  <div class="catalog" v-else-if="filteredBurgers && !filteredBurgers.length">
    <h3>No matching products...</h3>
  </div>
  <div class="catalog" v-else>Catalog is empty...</div>
</template>

<script>
import "@/assets/base-styles.css";
import CatalogItem from "@/components/CatalogItem.vue";
import { API } from "@/config.js";
import { computed, ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: { CatalogItem },
  setup() {
    const store = useStore();
    const goods = computed(() => store.state.goods);
    const burgers = computed(() => goods.value?.burgers);

    const serverError = ref(false);
    const searchValue = ref("");

    const filteredBurgers = computed(() => {
      if (!goods.value?.burgers) return null;
      return goods.value.burgers.filter((burger) =>
        burger.title.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    });

    const addToCart = async (id) => {
      store.commit("addToCart", { id });
    };

    const submitOrder = async (userData) => {
      store.commit("submitOrger", { userData });
    };

    onMounted(async () => {
      store.commit("loadCatalog");
    });

    return {
      burgers,
      serverError,
      searchValue,
      filteredBurgers,
      addToCart,
      submitOrder,
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
.filtering {
  margin: 20px;
  display: flex;
  justify-content: center;
}
.input {
  height: 1.5rem;
  border-radius: 10px;
  border: 1px solid var(--color-main-bg);
  max-width: 15rem;
  width: 100%;
  padding: 0 1rem;
  margin-left: 2rem;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.26);
}
</style>