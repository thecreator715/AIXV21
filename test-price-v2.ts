import { Client } from 'xrpl';

async function getPrice() {
  const client = new Client('wss://xrplcluster.com');
  await client.connect();
  
  // Try looking for AIX/XRP offers
  const response = await client.request({
    command: 'book_offers',
    taker_gets: {
      currency: 'AIX',
      issuer: 'rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz'
    },
    taker_pays: {
      currency: 'XRP'
    },
    limit: 1
  });
  
  console.log(JSON.stringify(response.result.offers[0], null, 2));
  
  await client.disconnect();
}

getPrice().catch(console.error);