module.exports = async function (context, req) {
  return {
    status: 200,
    headers: { "content-type": "application/json" },
    body: {
      ok: true,
      service: "resejournal-api",
      time: new Date().toISOString()
    }
  };
};
