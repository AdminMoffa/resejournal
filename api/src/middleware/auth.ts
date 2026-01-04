
// apps/api/src/middleware/auth.ts
import { HttpRequest } from "@azure/functions";
import { createRemoteJWKSet, jwtVerify } from "jose";

const B2C_AUTH_HOST = "adminmoffa.b2clogin.com";
const TENANT_DOMAIN = "adminmoffa.onmicrosoft.com";
const POLICY = "B2X_1_ResejournalSignUpSignIn";

// Din API's Application ID URI (Expose an API)
const AUDIENCE = "api://adminmoffa.onmicrosoft.com/resejournal-api";

const JWKS_URL = `https://${B2C_AUTH_HOST}/${TENANT_DOMAIN}/${POLICY}/discovery/v2.0/keys`;
const ISSUER   = `https://${B2C_AUTH_HOST}/${TENANT_DOMAIN}/${POLICY}/v2.0/`;

const jwks = createRemoteJWKSet(new URL(JWKS_URL));

export async function validateBearerToken(req: HttpRequest) {
  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!auth || !auth.toLowerCase().startsWith("bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  const token = auth.slice("bearer ".length);

  const { payload } = await jwtVerify(token, jwks, { issuer: ISSUER, audience: AUDIENCE });

  const scopes = (payload as any).scp?.split(" ") || [];
  if (!scopes.includes("access_as_user")) {
    throw new Error("Insufficient scope");
  }

  return {
    sub: payload.sub,
    name: (payload as any).name,
    email: (payload as any).emails?.[0],
    scopes,
    payload,
  };
}
