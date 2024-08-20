<template>
  <div>
    <h1>Redigera publikation</h1>
    <section v-if="showTypeSelector">
      <publicationTypeSelector :previousType="previousType" />
    </section>

    <section v-else>
      <publicationEditForm
        :publicationID="publication.id"
        @changeType="
          () => (
            (previousType = publication.publication_type_id),
            (publication.publication_type_id = null)
          )
        "
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Publication } from "~/types/publication";
import { storeToRefs } from "pinia";
import { useGupDataStore } from "~/stores/gup_data";
const route = useRoute();

// install store
const gupStore = useGupDataStore();
const { publication } = storeToRefs(gupStore);
const { fetchPublication, createNewPublication } = gupStore;
let previousType = null;
if (route.params.publication_id !== "new") {
  // fetch existing publication
  await fetchPublication(route.params.publication_id);
} else {
  // create new publication
  const newPublication: Publication = {
    title: "No title yet",
    id: null,
    authors: [],
    publication_type_id: null,
  };

  await createNewPublication(newPublication);
}
const showTypeSelector = computed(() => {
  // show type selector if publication type is not set
  return publication?.value?.publication_type_id === null ? true : false;
});
</script>

<style lang="scss" scoped></style>
