const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://127.0.0.1:9200', // HTTP
  auth: { username: 'elastic', password: 's5ADAyRHmxxBxQKISuhO' },
  sniffOnStart: false,
  sniffInterval: false,
  sniffOnConnectionFault: false
});


async function checkConnection() {
  try {
    await client.ping();
    console.log('✅ Elasticsearch is connected successfully!');
  } catch (error) {
    console.error('❌ Elasticsearch connection failed:', error.meta?.body || error);
  }
}

checkConnection();

module.exports = client;
