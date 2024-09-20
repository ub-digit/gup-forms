import { any, z } from "zod";

/* SCHEMA TYPES */
/* ####################### */

//
const zFormkitInputText = z.object({
  $formkit: z.string(),
  label: z.string(),
  name: z.string(),
  id: z.string(),
  value: z.string().nullish(),
  help: z.string().nullish(),
  validation: z.string().nullish(),
});

const zFormkitHTML = z.object({
  $el: z.string(), //ie div
  children: z.string(), // ie value inside div
});

const zFormkitAuthorName = z.object({
  $formkit: z.string(),
  label: z.string(),
  name: z.string(),
  help: z.string(),
  value: z.string(),
});

const zFormkitDepartmentRepeater = z.object({
  $formkit: z.string(),
  name: z.string(),
  children: z.array(zFormkitInputText),
});

const zFormkitAuthorRepeater = z.object({
  $formkit: z.string(),
  name: z.string(),
  children: z.array(z.union([zFormkitAuthorName, zFormkitDepartmentRepeater])),
  dynamic: z.boolean().nullish(),
});

const zFormkitInputNumber = z.object({
  $formkit: z.string(),
  label: z.string(),
  id: z.string(),
  name: z.string(),
  value: z.string().nullish(),
  help: z.string().nullish(),
});

const zFormkitTextArea = z.object({
  $formkit: z.string(),
  name: z.string(),
  id: z.string(),
  value: z.string().nullish(),
  label: z.string(),
  placeholder: z.string().nullish(),
  validation: z.string().nullish(),
  validation_visibility: z.string(),
  validation_messages: z.object({
    value: z.string(),
  }),
});

const zFormkitSelectInput = z.object({
  $cmp: z.string(),
  props: z.object({
    type: z.string(),
    name: z.string(),
    id: z.string(),
    label: z.string(),
    value: z.string().nullish(),
    options: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
  }),
});

const zFormkitCheckbox = z.object({
  $formkit: z.string(),
  name: z.string(),
  label: z.string(),
});

/* ####################### */
/** END SCHEMA TYPES */

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
  schema: z
    .array(
      z.union([
        zFormkitInputText,
        zFormkitInputNumber,
        zFormkitTextArea,
        zFormkitCheckbox,
        zFormkitSelectInput,
        zFormkitHTML,
        zFormkitAuthorRepeater,
        zFormkitDepartmentRepeater,
        z.object({}),
      ])
    )
    .nullish(),
});

export const zPublicationTypeArray = z.array(zPublicationType);
export type PublicationType = z.infer<typeof zPublicationType>;
export type PublicationTypeArray = z.infer<typeof zPublicationTypeArray>;
export type FormkitInputText = z.infer<typeof zFormkitInputText>;
export type FormkitInputNumber = z.infer<typeof zFormkitInputNumber>;
export type FormkitTextArea = z.infer<typeof zFormkitTextArea>;
export type FormkitInputCheckbox = z.infer<typeof zFormkitCheckbox>;
export type FormkitSelectInput = z.infer<typeof zFormkitSelectInput>;
export type FormkitHTML = z.infer<typeof zFormkitHTML>;
export type FormkitAuthorName = z.infer<typeof zFormkitAuthorName>;
export type FormkitAuthorRepeater = z.infer<typeof zFormkitAuthorRepeater>;
export type FormkitDepartmentRepeater = z.infer<
  typeof zFormkitDepartmentRepeater
>;
