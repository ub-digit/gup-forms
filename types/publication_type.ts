import { z } from "zod";

export const zPublicationType = z.object({
  id: z.number(),
  code: z.string(),
  ref_options: z.string(),
  name: z.string(),
  description: z.string(),
  ref_select_options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  all_fields: z.array(
    z.object({
      id: z.number(),
      field_id: z.number(),
      publication_type_id: z.number(),
      rule: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      label: z.string(),
      name: z.string(),
    })
  ),
});
export const zPublicationTypeArray = z.array(zPublicationType);
export type PublicationType = z.infer<typeof zPublicationType>;
export type PublicationTypeArray = z.infer<typeof zPublicationTypeArray>;
