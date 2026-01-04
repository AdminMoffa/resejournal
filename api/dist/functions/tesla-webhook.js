import { app } from "@azure/functions";
import { ServiceBusClient } from '@azure/service-bus';
const sb = new ServiceBusClient(process.env.SB_CONNECTION);
const sender = sb.createSender('oem-webhooks');
app.http('tesla-webhook', {
    route: 'webhooks/tesla', methods: ['POST'], authLevel: 'function',
    handler: async (req) => {
        const payload = await req.text();
        await sender.sendMessages({ body: payload });
        return { status: 202 };
    }
});
