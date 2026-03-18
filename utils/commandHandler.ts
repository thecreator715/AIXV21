import { WalletContextType } from '../contexts/WalletContext';

export const handleCommand = async (command: string, walletContext: WalletContextType): Promise<string | null> => {
  const parts = command.trim().split(' ');
  const cmd = parts[0].toLowerCase();
  const client = walletContext.client;
  const wallet = walletContext.wallet;

  if (!client || !client.isConnected()) {
    return 'Error: Client not connected to XRPL.';
  }

  switch (cmd) {
    case '/get':
      const subCmd = parts[1]?.toLowerCase();
      try {
        switch (subCmd) {
          case 'balance':
            await walletContext.refreshBalances();
            return `Balance: ${walletContext.xrpBalance} XRP, ${walletContext.aixBalance} AIX`;
          case 'transactions':
          case 'txs':
            await walletContext.fetchTransactions();
            return `Fetched last 10 transactions.`;
          case 'nfts':
            await walletContext.refreshBalances();
            return `You have ${walletContext.nfts.length} NFTs.`;
          case 'info':
            const info = await client.request({ command: 'account_info', account: wallet?.address });
            return JSON.stringify(info.result, null, 2);
          case 'lines':
            const lines = await client.request({ command: 'account_lines', account: wallet?.address });
            return JSON.stringify(lines.result, null, 2);
          case 'ledger':
            const ledger = await client.request({ command: 'ledger', ledger_index: 'validated' });
            return JSON.stringify(ledger.result, null, 2);
          case 'server':
            const server = await client.request({ command: 'server_info' });
            return JSON.stringify(server.result, null, 2);
          case 'offers':
            const offers = await client.request({ command: 'account_offers', account: wallet?.address });
            return JSON.stringify(offers.result, null, 2);
          case 'channels':
            const channels = await client.request({ command: 'account_channels', account: wallet?.address });
            return JSON.stringify(channels.result, null, 2);
          default:
            return 'Unknown get command. Try: /get balance, /get transactions, /get nfts, /get info, /get lines, /get ledger, /get server, /get offers, /get channels';
        }
      } catch (err: any) {
        return `Error: ${err.message}`;
      }
    case '/address':
      return `Your XRP address is: ${wallet?.address}`;
    case '/send':
      const token = parts[1]?.toLowerCase();
      const amount = parts[2];
      const destination = parts[3];
      if (!token || !amount || !destination) return 'Usage: /send <xrp|aix> <amount> <address>';
      try {
        if (token === 'xrp') {
          await walletContext.sendXRP(amount, destination);
          return `Sent ${amount} XRP to ${destination}`;
        } else if (token === 'aix') {
          await walletContext.sendAIX(amount, destination);
          return `Sent ${amount} AIX to ${destination}`;
        } else {
          return 'Unknown token. Use xrp or aix.';
        }
      } catch (err: any) {
        return `Error: ${err.message}`;
      }
    case '/trade':
      return 'Trading functionality is not yet implemented in this version.';
    case '/disconnect':
      walletContext.disconnectWallet();
      return 'Wallet disconnected.';
    case '/generate':
      walletContext.generateWallet();
      return 'New wallet generated.';
    case '/status':
      return walletContext.isConnected ? 'Connected to XRPL.' : 'Disconnected from XRPL.';
    case '/version':
      return 'Alpha Free v1.0';
    case '/about':
      return 'Alpha AI is a lightweight XRPL assistant.';
    case '/settings':
      return 'Settings not available.';
    case '/donate':
      return 'Donate to: rfZxQoUcgXtoZFQ8jmzdWDDXxhNUXhzadz';
    case '/website':
      return 'https://aix.online';
    case '/help':
    case '/list':
      return `Available commands:
/get balance, /get transactions, /get nfts, /get info, /get lines, /get ledger, /get server, /get offers, /get channels
/address, /send <xrp|aix> <amount> <address>, /trade, /disconnect, /generate, /status, /version, /about, /settings, /donate, /website, /list`;
    default:
      return null; // Not a command
  }
};
