<template>
  <div>
    <h1>GUP form prototype</h1>

    <h2>Skapa ny publikation</h2>
    <NuxtLink
      :to="{
        name: 'publication-edit-publication_id',
        params: { publication_id: 'new' },
      }"
    >
      <button>Ny publikation</button>
    </NuxtLink>

    <h2>Redigera publikation</h2>
    <ul>
      <li v-for="publication in publications" :key="publication.id">
        <NuxtLink
          :to="{
            name: 'publication-show-publication_id',
            params: { publication_id: publication.id },
          }"
        >
          {{ publication.title }}
        </NuxtLink>
        <NuxtLink
          :to="{
            name: 'publication-edit-publication_id',
            params: { publication_id: publication.id },
          }"
        >
          <button>Redigera</button>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { type Publication } from "~/types/publication";
import { useGupDataStore } from "~/stores/gup_data";

const gupStore = useGupDataStore();
const { publications } = storeToRefs(gupStore);
const { fetchPublications } = gupStore;
await fetchPublications();
</script>

<style scoped></style>
