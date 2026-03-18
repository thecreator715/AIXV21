import { Client } from 'xrpl';

async function getPrice() {
  const client = new Client('wss://xrplcluster.com');
  await client.connect();
  
  const response = await client.request({
    command: 'book_offers',
    taker_gets: {
      currency: 'XRP'
    },
    taker_pays: {
      currency: 'AIX',
      issuer: 'rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz'
    },
    limit: 1
  });
  
  console.log(JSON.stringify(response.result.offers[0], null, 2));
  
  await client.disconnect();
}

getPrice().catch(console.error);
