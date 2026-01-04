
import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import fetch from 'node-fetch'

const TESLA_FLEET = 'https://fleet-api.prd.vn.cloud.tesla.com'

async function getUserAccessToken(req: HttpRequest): Promise<string> {
  // TODO: implementera fetch/refresh av tokens
  return ''
}

app.http('vehicles', {
  route: 'tesla/vehicles', methods: ['GET'], authLevel: 'function',
  handler: async (req: HttpRequest): Promise<HttpResponseInit> => {
    const accessToken = await getUserAccessToken(req)
    const res = await fetch(`${TESLA_FLEET}/api/1/vehicles`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const data = await res.json()
    return { status: 200, jsonBody: data }
  }
})
