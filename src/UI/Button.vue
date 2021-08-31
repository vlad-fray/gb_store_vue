<template>
  <button @click="onClick" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "button",
  props: ["onClick"],
};
</script>

<style scoped>
.button {
  color: var(--color-main-text);
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 5px 0 var(--color-main-bg);
  background-color: white;
}

.button:hover {
  box-shadow: none;
}

.button:active {
  color: white;
  background-color: var(--color-main-bg);
}
</style>