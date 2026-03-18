import { Client } from 'xrpl';

async function test() {
  console.log("Started");
  const client = new Client('wss://xrplcluster.com');
  await client.connect();
  console.log("Connected");
  try {
    const res = await client.request({
      command: 'account_nfts',
      account: 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV'
    });
    console.log("Res:", res);
  } catch (err: any) {
    console.log("Error:", err);
    console.log("Error data:", err.data);
  }
  await client.disconnect();
  console.log("Done");
}
test().catch(console.error);
