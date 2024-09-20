import {
  zPublicationType,
  zPublicationTypeArray,
  type PublicationType,
} from "~/types/publication_type";

import {
  zPublication,
  zPublicationArray,
  type Publication,
} from "~/types/publication";
import { ReactiveEffect, type Ref } from "vue";

export const useGupDataStore = defineStore("gupDataStore", () => {
  const publications: Ref<Publication[]> = ref([]);
  const publication: Ref<Publication | null> = ref(null);
  const publicationTypes: Ref<PublicationType[]> = ref([]);
  const publicationType: Ref<PublicationType | null> = ref(null);

  const fetchPublicationTypes = async () => {
    const { data } = await useFetch("/api/publication_types");
    publicationTypes.value = zPublicationTypeArray.parse(data.value);
  };

  const fetchPublicationType = async (id: number) => {
    const { data } = await useFetch(`/api/publication_types/${id}`);
    publicationType.value = zPublicationType.parse(data.value);
  };

  const fetchPublications = async () => {
    const { data } = await useFetch("/api/publications");
    publications.value = zPublicationArray.parse(data.value);
  };

  const fetchPublication = async (id: number) => {
    const { data } = await useFetch(`/api/publications/${id}`);
    publication.value = zPublication.parse(data.value);
  };

  // create new empty publication to be filled in by user
  const createNewPublication = async (newPublication: Publication) => {
    publication.value = zPublication.parse(newPublication);
  };

  const resetStore = () => {
    publicationTypes.value = [];
    publications.value = [];
    publication.value = null;
  };

  return {
    publicationTypes,
    publicationType,
    publications,
    publication,
    fetchPublication,
    fetchPublications,
    fetchPublicationType,
    fetchPublicationTypes,
    createNewPublication,
  };
});
