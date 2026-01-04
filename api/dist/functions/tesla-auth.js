import { app } from "@azure/functions";
import fetch from 'node-fetch';
const TESLA_AUTH = 'https://fleet-auth.prd.vn.cloud.tesla.com';
export async function startAuth(req, ctx) {
    const clientId = process.env.TESLA_CLIENT_ID;
    const redirect = process.env.TESLA_REDIRECT_URI;
    const scope = encodeURIComponent('openid email offline_access vehicle_device_data vehicle_telemetry');
    const url = `${TESLA_AUTH}/oauth2/v3/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&scope=${scope}`;
    return { status: 302, headers: { Location: url } };
}
export async function callback(req, ctx) {
    const code = req.query.get('code');
    if (!code)
        return { status: 400, body: 'Missing code' };
    const tokenRes = await fetch(`${TESLA_AUTH}/oauth2/v3/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: process.env.TESLA_CLIENT_ID,
            client_secret: process.env.TESLA_CLIENT_SECRET,
            redirect_uri: process.env.TESLA_REDIRECT_URI
        })
    });
    const tokens = await tokenRes.json();
    // TODO: spara refresh_token säkert kopplat till användare
    return { status: 200, jsonBody: { ok: true, tokens } };
}
app.http('tesla-auth-start', { route: 'tesla/auth/start', methods: ['GET'], authLevel: 'anonymous', handler: startAuth });
app.http('tesla-auth-callback', { route: 'tesla/callback', methods: ['GET'], authLevel: 'anonymous', handler: callback });
