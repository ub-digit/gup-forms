<template>
  <div>
    <button @click="$emit('changeType')">Byt publikationstyp</button>
    <div>{{ publicationType?.name }} - {{ publicationType?.description }}</div>
    <br />

    <br />

    <!--     <div>
      <FormKit
        type="form"
        #default="{ value }"
        :actions="false"
        v-model="simpleData"
      >
        <FormKitSchema :schema="simpleSchema" />
      </FormKit>
      <pre wrap> {{ simpleData }}</pre>
    </div> -->

    <div>
      <FormKit
        #default="{ value }"
        type="form"
        :actions="false"
        v-model="publication"
      >
        <FormKitSchema :schema="publicationTypeSchema" />
      </FormKit>
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
import type { PublicationType } from "~/types/publication_type";

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

if (
  publication.value?.publication_type_id !== null &&
  publication.value?.publication_type_id !== undefined
) {
  await fetchPublicationType(publication?.value?.publication_type_id);
}

const publicationTypeSchema = computed(() => {
  return publicationType?.value?.schema;
});
</script>

<style lang="scss" scoped></style>
