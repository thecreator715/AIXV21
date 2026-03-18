import { Client } from 'xrpl';

async function getPrice() {
  const client = new Client('wss://xrplcluster.com');
  await client.connect();
  
  // Try looking for XRP/AIX offers
  const response = await client.request({
    command: 'account_lines',
    account: 'rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz',
    limit: 10
  });
  
  console.log(JSON.stringify(response, null, 2));
  
  await client.disconnect();
}

getPrice().catch(console.error);