export default defineEventHandler(async (event) => {
  const data = await import("../store/publications.json");
  console.log(data.default);
  return data.default;
});
