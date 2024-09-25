import { z } from "zod";

export const zDepartment = z.object({
  id: z.number(),
  name: z.string(),
  name_sv: z.string(),
  name_en: z.string(),
});

export const zAuthor = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  year_of_birth: z.number().nullish(),
  presentation_string: z.string().nullish(),
  departments: z.array(zDepartment).nullable(),
});

export const zPublication = z.object({
  id: z.number().nullable(),
  title: z.string().nullable(),
  alt_title: z.string().nullable(),
  abstract: z.string().nullable(),
  pubyear: z.number().nullish(),
  authors: z.array(zAuthor).nullable(),
  publication_type_id: z.number().nullable(),
  //publication_links: z.array(z.string()).nullish(),
  ref_value: z.string().nullable(),
  publication_type_label: z.string().nullable(),
  ref_value_label: z.string().nullable(),
  published_at: z.string().nullable(),
  deleted_at: z.string().nullable(),
  epub_ahead_of_print: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  publication_id: z.number().nullable(),
  publanguage: z.string().nullable(),
  keywords: z.string().nullable(),
  pub_notes: z.string().nullable(),
  journal_id: z.number().nullable(),
  sourcetitle: z.string().nullable(),
  sourcevolume: z.string().nullable(),
  sourceissue: z.string().nullable(),
  sourcepages: z.string().nullable(),
  issn: z.string().nullable(),
  eissn: z.string().nullable(),
  article_number: z.string().nullable(),
  extent: z.string().nullable(),
  publisher: z.string().nullable(),
  place: z.string().nullable(),
  isbn: z.string().nullable(),
  artwork_type: z.string().nullable(),
  dissdate: z.string().nullable(),
  dissopponent: z.string().nullable(),
  patent_applicant: z.string().nullable(),
  patent_application_number: z.string().nullable(),
  patent_application_date: z.string().nullable(),
  patent_number: z.string().nullable(),
  patent_date: z.string().nullable(),
  sourceid: z.string().nullable(),
  artistic_basis: z.string().nullable(),
  version_id: z.number().nullable(),
});

export const zPublicationArray = z.array(zPublication);
export type PublicationArray = z.infer<typeof zPublicationArray>;
export type Publication = z.infer<typeof zPublication>;
