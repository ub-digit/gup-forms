import { z } from "zod";

const zAuthor = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
});
export const zPublication = z.object({
  title: z.string().nullable(),
  id: z.number().nullable(),
  authors: z.array(zAuthor).nullable(),
  publication_type_id: z.number().nullable(),
});

export const zPublicationArray = z.array(zPublication);
export type PublicationArray = z.infer<typeof zPublicationArray>;
export type Publication = z.infer<typeof zPublication>;
