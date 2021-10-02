<template>
  <div class="wrapper">
    <h1 class="h1">Page Not Found</h1>
    <router-link :to="{ name: 'Catalog' }">Go to the main page</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  max-width: 800px;
  margin: 5rem auto;
  text-align: center;
}
.wrapper h1 {
  font-size: 4rem;
}
.wrapper a {
  display: inline-block;
  margin: 10px auto 0;
  padding: 10px;
  font-size: 2rem;
  background-color: white;
  color: var(--color-main-text);
  border-radius: 5px;
  box-shadow: 0 0 5px 0 var(--color-main-text);
}

.wrapper a:hover {
  box-shadow: none;
}
</style>