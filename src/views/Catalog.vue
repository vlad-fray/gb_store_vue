<template>
  <div class="filtering">
    <label for="filter">Write a name of a burger:</label>
    <input
      id="filter"
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
import { computed, ref } from "@vue/reactivity";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: { CatalogItem },
  setup() {
    const store = useStore();
    const catalog = computed(() => store.getters.getCatalog);

    const serverError = ref(false);
    const searchValue = ref("");

    const filteredBurgers = computed(() => {
      if (!catalog.value?.burgers) return null;
      return catalog.value.burgers.filter((burger) =>
        burger.title.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    });

    const addToCart = async (id) => {
      store.dispatch("ADD_TO_CART", { id });
    };

    const submitOrder = async (userData) => {
      store.commit("submitOrger", { userData });
    };

    onMounted(async () => {
      store.dispatch("LOAD_CATALOG");
    });

    return {
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
.filtering label {
  font-size: 1.75rem;
  font-weight: 600;
  color: white;
}
.input {
  height: 2rem;
  border-radius: 10px;
  border: 1px solid var(--color-main-bg);
  max-width: 15rem;
  width: 100%;
  padding: 0 1rem;
  margin-left: 2rem;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.26);
}
</style>