import { Client } from 'xrpl';

async function getPrice() {
  const client = new Client('wss://xrplcluster.com');
  await client.connect();
  
  // Try looking for XRP/AIX offers
  const response = await client.request({
    command: 'book_offers',
    taker_gets: {
      currency: 'XRP'
    },
    taker_pays: {
      currency: 'AIX',
      issuer: 'rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz'
    }
  });
  
  console.log(JSON.stringify(response, null, 2));
  
  await client.disconnect();
}

getPrice().catch(console.error);