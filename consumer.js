const client = require('./pulsar/pulsarClient');
const consumerName = process.argv[2] || 'consumer-default';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

(async () => {
    const consumer = await client.subscribe({
        topic: 'my-topic',
        subscription: 'my-keyshared-subscription',
        subscriptionType: 'KeyShared',
        consumerName: consumerName,
        ackTimeoutMs: 3600000,
        concurrencyLimit: 5,
        fetchBatchTimeoutMs: 3000,
        batchSizeLimit: 1000,
        maxReceiverQueueSize: 5,
        maxRedeliveryCount: 5,
        enableBatchIndexAck: false
    });

    console.log(`${consumerName} aguardando mensagens...`);
    while (true) {
        const msgs = await consumer.batchReceive();
        for (const msg of msgs) {
            const key = await msg.getPartitionKey();
            if (key === 'fixed-key') {
                await delay(1000); // Delay to simulate slow performance for fixed keys
                console.log(`[Fixed]${consumerName} data:`, msg.getData().toString(), 'Key:', key);
            } else {
                console.log(`[Random]${consumerName} data:`, msg.getData().toString(), 'Key:', key);
            }
        }
        await Promise.all(msgs.map(async (message) => await consumer.acknowledge(message)));
    }
})();
