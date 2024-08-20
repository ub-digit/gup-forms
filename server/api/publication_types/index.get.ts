export default defineEventHandler(async (event) => {
  const data = await import("../store/publication_types.json");
  return data.default;
});
