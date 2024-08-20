<template>
  <div>
    <h1>Välj typ av publikation</h1>
    Nuvarande vald typ: {{ publication.publication_type_id }}
    <button
      v-if="previousType !== null"
      @click="publication.publication_type_id = previousType"
    >
      Cancel (resets old value)
    </button>
    <ul>
      <li v-for="publicationType in publicationTypes" :key="publicationType.id">
        <a
          href="javascript:void(0)"
          @click="publication.publication_type_id = publicationType.id"
          ><h3>{{ publicationType.name }} ({{ publicationType.code }})</h3></a
        >
        <p>{{ publicationType.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGupDataStore } from "~/stores/gup_data";
import { type publicationType } from "~/types/publication_type";
const props = defineProps<{
  previousType: number | null;
}>();

const gupStore = useGupDataStore();
const { fetchPublicationTypes } = gupStore;
const { publicationTypes, publication } = storeToRefs(gupStore);

await fetchPublicationTypes();
</script>

<style lang="scss" scoped></style>
