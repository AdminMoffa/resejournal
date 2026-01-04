import { app } from "@azure/functions";
app.serviceBusQueue('normalize', {
    queueName: 'oem-webhooks',
    connection: 'SB_CONNECTION',
    handler: async (message) => {
        try {
            const raw = JSON.parse(message.body);
            // TODO: normalisera och spara i DB
            console.log('received', Object.keys(raw));
        }
        catch (e) {
            console.error('normalize error', e);
        }
    }
});
