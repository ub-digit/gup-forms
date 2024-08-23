import { zPublicationType } from "~/types/publication_type";
import type {
  PublicationType,
  InputText,
  InputNumber,
  TextArea,
} from "~/types/publication_type";

export default defineEventHandler(async (event) => {
  const id = Number(event?.context?.params?.id);
  const data = await import("../store/publication_types.json");

  let publicationType: PublicationType = data.default.find(
    (itemType) => itemType?.id === id
  );

  publicationType = zPublicationType.parse(publicationType);

  const getFieldType = (field: any) => {
    switch (field.name) {
      case "title":
        return "textarea";
      case "alt_title":
        return "textarea";
      case "abstract":
        return "textarea";
      case "pubyear":
        return "text";
      case "publanguage":
        return "text";
      case "category_hsv_11":
        return "text";
      case "extid":
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

  publicationType?.all_fields?.forEach((field) => {
    const fieldType = getFieldType(field);
    if (fieldType === "text") {
      const inputText: InputText = {
        $formkit: "text",
        label: field.label,
        value: "",
        name: field.name,
        id: field.name,
        help: "",
        validation: field.rule === "R" ? "required" : "",
      };
      extendedPublicationType?.schema?.push(inputText);
    } else if (fieldType === "textarea") {
      const textArea: TextArea = {
        $formkit: "textarea",
        name: field.name,
        id: field.name,
        label: field.label,
        placeholder: "",
        validation: field.rule === "R" ? "required" : "",
        validation_visibility: "visible",
        validation_messages: {
          value: "",
        },
      };
      extendedPublicationType?.schema?.push(textArea);
    } else if (fieldType === "date") {
      const inputNumber: InputNumber = {
        $formkit: "date",
        label: field.label,
        id: field.name,
        name: field.name,
        value: null,
        help: "",
      };
      extendedPublicationType?.schema?.push(inputNumber);
    }
  });

  return extendedPublicationType;
});
