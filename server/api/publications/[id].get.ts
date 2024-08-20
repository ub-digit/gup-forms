export default defineEventHandler(async (event) => {
  const id = Number(event?.context?.params?.id);
  const data = await import("../store/publications.json");
  const publication = data.default.find(
    (publication) => publication?.id === id
  );
  console.log(publication);
  return publication;
});
