<template>
  <div>
    <h1>Publikationstyp</h1>
    <p>Publikationstypens id: {{ $route.params.id }}</p>
    <p>{{ publicationType.name }}</p>
    <ul>
      <li v-for="field in publicationType.all_fields">
        {{ field.id }} : {{ field.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: publicationType } = await useFetch(
  `/api/publication_types/${route.params.id}`
);
console.log(publicationType);
</script>

<style lang="scss" scoped></style>
