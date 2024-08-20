export default defineEventHandler(async (event) => {
  const id = Number(event?.context?.params?.id);
  const data = await import("../store/publication_types.json");
  const publicationType = data.default.find(
    (publicationType) => publicationType?.id === id
  );
  console.log(publicationType);
  return publicationType;
});
