<template>
  <div>
    <button @click="$emit('changeType')">Byt publikationstyp</button>

    <h2>Formulär</h2>
    <div></div>

    <div>
      <pre>
      <h2>Vald typ (definition)</h2>
      {{ publicationType }}
      </pre>
      <pre>
      <h2>Publikation</h2>
      {{ publication }}
    </pre
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { storeToRefs } from "pinia";
import { z } from "zod";
import { useGupDataStore } from "~/stores/gup_data";
import { type Publication } from "~/types/publication";
import type { publicationType } from "~/types/publicationType";

// install store
const gupStore = useGupDataStore();

// define props and emits
const props = defineProps<{
  publicationID: number;
}>();

const emit = defineEmits({
  changeType: () => true,
});

const { publication } = storeToRefs(gupStore);
const { fetchPublication } = gupStore;

const { publicationType } = storeToRefs(gupStore);
const { fetchPublicationType } = gupStore;

if (publication.value.publication_type_id !== null) {
  await fetchPublicationType(publication.value.publication_type_id);
}
</script>

<style lang="scss" scoped></style>
