require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: process.env.ELASTIC_NODE,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY
  },
  ssl: {
    rejectUnauthorized: false 
  }
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
