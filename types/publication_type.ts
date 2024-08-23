import { z } from "zod";

const zInputText = z.object({
  $formkit: z.string(),
  label: z.string(),
  name: z.string(),
  id: z.string(),
  value: z.string().nullish(),
  help: z.string().nullish(),
  validation: z.string().nullish(),
});

const zInputNumber = z.object({
  $formkit: z.string(),
  label: z.string(),
  id: z.string(),
  name: z.string(),
  value: z.number().nullish(),
  help: z.string().nullish(),
});

const zTextArea = z.object({
  $formkit: z.string(),
  name: z.string(),
  id: z.string(),
  label: z.string(),
  placeholder: z.string().nullish(),
  validation: z.string().nullish(),
  validation_visibility: z.string(),
  validation_messages: z.object({
    value: z.string(),
  }),
});

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
  schema: z.array(z.union([zInputText, zInputNumber, zTextArea])).nullish(),
});
export const zPublicationTypeArray = z.array(zPublicationType);
export type PublicationType = z.infer<typeof zPublicationType>;
export type PublicationTypeArray = z.infer<typeof zPublicationTypeArray>;
export type InputText = z.infer<typeof zInputText>;
export type InputNumber = z.infer<typeof zInputNumber>;
export type TextArea = z.infer<typeof zTextArea>;
