import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function health(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  return {
    status: 200,
    jsonBody: {
      ok: true,
      service: "resejournal-api",
      time: new Date().toISOString()
    }
  };
}

app.http("health", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: health
});
