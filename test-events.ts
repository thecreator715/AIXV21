import { Client } from 'xrpl';
const client = new Client('wss://xrplcluster.com');
client.on('connected', () => console.log('connected'));
client.on('disconnected', () => console.log('disconnected'));
client.connect().then(() => client.disconnect());
