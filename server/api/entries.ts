export default eventHandler(async (event) => {
  const uid = event.headers.get("Authorization");

  if (!uid) {
    return new Response("Unauthorized", { status: 401 });
  }

  const entries = await fetch(`/.netlify/functions/entries`, {
    headers: {
      uid: uid,
    },
  });

  const data = await entries.json();

  return {
    status: 200,
    body: JSON.stringify(data),
  };
});
