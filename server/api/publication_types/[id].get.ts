import { zPublicationType } from "~/types/publication_type";
import type {
  PublicationType,
  FormkitInputText,
  FormkitInputNumber,
  FormkitTextArea,
  FormkitSelectInput,
  FormkitInputCheckbox,
  FormkitHTML,
  FormkitAuthorRepeater,
  FormkitDepartmentRepeater,
} from "~/types/publication_type";

export default defineEventHandler(async (event) => {
  const id = Number(event?.context?.params?.id);
  const data = await import("../store/publication_types.json");

  let publicationType: PublicationType | undefined = data.default.find(
    (itemType) => itemType?.id === id
  );

  function getFormkitTextAreaSchema(field: any): FormkitTextArea {
    return {
      $formkit: "textarea",
      name: field.name,
      id: field.name,
      label: field.label,
      value: "$" + field.name,
      placeholder: "",
      validation: field.rule === "R" ? "required" : "",
      validation_visibility: "visible",
      validation_messages: {
        value: "",
      },
    };
  }

  function getFormkitTextInputSchema(field: any): FormkitInputText {
    return {
      $formkit: "text",
      label: field.label,
      name: field.name,
      id: field.name,
      help: "",
      value: "$" + field.name,
      validation: field.rule === "R" ? "required" : "",
    };
  }

  function getFormkitNumberInputSchema(field: any): FormkitInputNumber {
    return {
      $formkit: "number",
      label: field.label,
      id: field.name,
      value: "$" + field.name,
      name: field.name,
      help: "",
    };
  }

  function getFormkitCheckboxInputSchema(field: any): FormkitInputCheckbox {
    return {
      $formkit: "checkbox",
      name: field.name,
      label: field.label,
    };
  }

  function getFormkitSelectInputSchema(
    type: PublicationType
  ): FormkitSelectInput {
    return {
      $cmp: "FormKit",
      props: {
        type: "select",
        name: "ref_value",
        id: type.code + "-" + type.id.toString(),
        label: "$" + "ref_value_label",
        options: type.ref_select_options,
        value: "$" + "ref_value",
      },
    };
  }

  function getFormkitHTMLSchema(tag: string, content: string): FormkitHTML {
    return {
      $el: tag,
      children: content,
    };
  }

  function getFormkitAuthorsSchema(
    type: PublicationType
  ): FormkitAuthorRepeater {
    return {
      $formkit: "repeater",
      name: "authors",
      children: [
        {
          $formkit: "text",
          name: "name",
          label: "name",
          help: "",
          value: "$: ($value.presentation_string)",
        },
        {
          $formkit: "repeater",
          name: "departments",
          children: [
            {
              $formkit: "text",
              id: "$: ($value.id)",
              name: "department",
              label: "department",
              help: "",
              value: "$: ($value.name)",
            },
          ],
        },
      ],
    };
  }

  publicationType = zPublicationType.parse(publicationType);

  const getFieldType = (field: any) => {
    switch (field.name) {
      case "author":
        return "author";
      case "abstract":
        return "textarea";
      case "title":
        return "textarea";
      case "alt_title":
        return "textarea";
      case "abstract":
        return "textarea";
      case "pubyear":
        return "number";
      case "publanguage":
        return "text";
      case "category_hsv_11":
        return "text";
      case "extid":
        return "text";
      case "journal":
        return "text";
      case "volume":
        return "number";
      case "issue":
        return "number";
      case "pages":
        return "text";
      case "publisher":
        return "text";
      case "isbn":
        return "text";
      case "issn":
        return "text";
      case "doi":
        return "text";
      case "url":
        return "text";

      default:
        return "text";
    }
  };
  // extend publicationType with schema
  const extendedPublicationType: PublicationType = {
    ...publicationType,
    schema: [],
  };

  extendedPublicationType.schema?.push(
    getFormkitHTMLSchema(
      "div",
      `ref_options: ${extendedPublicationType.ref_options} `
    )
  );

  extendedPublicationType.schema?.push(
    getFormkitSelectInputSchema(extendedPublicationType)
  );

  publicationType?.all_fields?.forEach((field) => {
    const fieldType = getFieldType(field);
    if (fieldType === "text") {
      extendedPublicationType?.schema?.push(getFormkitTextInputSchema(field));
    } else if (fieldType === "textarea") {
      extendedPublicationType?.schema?.push(getFormkitTextAreaSchema(field));
    } else if (fieldType === "number") {
      extendedPublicationType?.schema?.push(getFormkitNumberInputSchema(field));
    } else if (fieldType === "author") {
      extendedPublicationType.schema?.push(
        getFormkitAuthorsSchema(extendedPublicationType)
      );
    }
  });
  return extendedPublicationType;
});
