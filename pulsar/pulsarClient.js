const pulsar = require('pulsar-client');

const client = new pulsar.Client({
    serviceUrl:  process.env.PULSAR_SERVICE_URL
});

module.exports = client;

