<template>
  <div>
    <button @click="$emit('changeType')">Byt publikationstyp</button>
    <div>
      <FormKitSchema :schema="publicationTypeSchema" />
    </div>

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
import { FormKitSchema } from "@formkit/vue";
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

const { publicationType } = storeToRefs(gupStore);
const { fetchPublicationType } = gupStore;

if (publication.value.publication_type_id !== null) {
  await fetchPublicationType(publication.value.publication_type_id);
}

const publicationTypeSchema = computed(() => {
  console.log(publicationType.value.schema);
  return publicationType.value.schema;
});
</script>

<style lang="scss" scoped></style>
