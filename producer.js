const client = require('./pulsar/pulsarClient');

(async () => {
    const producer = await client.createProducer({
        topic: 'my-topic',
        sendTimeoutMs: 60000,
        batchingEnabled: false,
    });

    if (process.env.SEQUENTIAL_MODE) {
        for (let i = 0; i < 2500; i++) {
            await producer.send({
                data: Buffer.from(`Mensagem ${i}`),
                partitionKey: `key-${i}`,
                properties: { aggregate: `key-${i}` }
            });
        }

        for (let i = 0; i < 300000; i++) {
            await producer.send({
                data: Buffer.from(`Mensagem ${i}`),
                partitionKey: 'fixed-key',
                properties: { aggregate: 'fixed-key' }
            });
        }

        for (let i = 0; i < 2500; i++) {
            await producer.send({
                data: Buffer.from(`Mensagem ${i}`),
                partitionKey: `key-${i}`,
                properties: { aggregate: `key-${i}` }
            });
        }
    } else {
        for (let i = 0; i < 300000; i++) {
            const fixed = producer.send({
                data: Buffer.from(`Mensagem ${i}`),
                partitionKey: 'fixed-key',
                properties: { aggregate: 'fixed-key' }
            });
            const random = producer.send({
                data: Buffer.from(`Mensagem ${i}`),
                partitionKey: `key-${i}`,
                properties: { aggregate: `key-${i}` }
            });
            await Promise.all([fixed, random])
        }
    }
    console.log('Mensagens enviadas!');
    await producer.close();
    await client.close();
})();
