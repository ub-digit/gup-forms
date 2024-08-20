<template>
  <div>
    <h1>Visa publikation</h1>

    <h2>{{ publication.title }}</h2>
    <NuxtLink
      :to="{
        name: 'publication-edit-publication_id',
        params: { publication_id: publication.id },
      }"
    >
      <button>Redigera</button>
    </NuxtLink>

    <pre>{{ publication }}</pre>
  </div>
</template>

<script setup lang="ts">
import { type Publication } from "~/types/publication";
import { storeToRefs } from "pinia";
import { useGupDataStore } from "~/stores/gup_data";
const route = useRoute();

// install store
const gupStore = useGupDataStore();
const { publication } = storeToRefs(gupStore);
const { fetchPublication } = gupStore;

await fetchPublication(route.params.publication_id);
</script>

<style lang="scss" scoped></style>
