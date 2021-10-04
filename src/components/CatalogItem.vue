<template>
  <div class="catalog-item">
    <img class="catalog-item__img-fill" :src="good.imgUrl" :alt="good.title" />
    <div class="catalog-item__content">
      <h3 class="catalog-item__heading">{{ good.title }}</h3>
      <p class="catalog-item__info">Price: ${{ good.price }}</p>
      <p class="catalog-item__info">Calorie: {{ good.cal }}kcal</p>
      <Button @onClick="addToCart" class="catalog-item__button" type="button">
        Add to cart
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "../UI/Button.vue";
export default {
  props: ["good"],
  components: {
    Button,
  },
  setup({ good }, context) {
    const addToCart = () => {
      context.emit("addItem", good.id);
    };

    return { addToCart };
  },
};
</script>

<style scoped>
.catalog-item {
  width: 20rem;
  background-color: var(--color-secondary-bg);
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.26);
}

.catalog-item__img-fill {
  height: 10rem;
  width: 100%;
  border-radius: inherit;
}

.catalog-item__content {
  padding: 1rem 1rem;
}

.catalog-item__heading {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.catalog-item__info {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.catalog-item__button {
  width: 100%;
  padding: 0.3rem;
}
</style>