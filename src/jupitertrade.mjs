const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { Jupiter } = require('@jup-ag/core');
const fs = require('fs');
const fetch = require('node-fetch');

const RPC_URL = "https://api.mainnet-beta.solana.com"; // Solana RPC URL
const TOKEN_LIST_URL = "https://token-list.solana.com/solana.tokenlist.json"; // Token list URL

async function getSOLLastPrice() {
    // Fetch SOL price in USDC
    const response = await fetch("https://quote-api.jup.ag/v1/price?ids=SOL");
    const data = await response.json();
    return data['SOL'].price;
}

async function placeLimitOrder(connection, wallet, jupiter, tokenPair, amount, side) {
    try {
        const slippageBps = 100; // 1% slippage
        const adjustedAmount = side === 'buy' ? amount : Math.round(amount / tokenPair.price);

        const quotes = await jupiter.getQuotes({
            inputToken: tokenPair.base,
            outputToken: tokenPair.quote,
            amount: adjustedAmount, // Amount in smallest unit (lamports for SOL)
            slippageBps,
        });

        if (!quotes || quotes.length === 0) {
            throw new Error('No quotes available');
        }

        const bestRoute = quotes[0]; // Choose the best route
        const { execute } = await jupiter.exchange({
            routeInfo: bestRoute,
            userPublicKey: wallet.publicKey,
        });

        const txId = await execute({ sendTx: connection.sendTransaction });
        console.log(`Limit order placed (${side}). Transaction ID: ${txId}`);
    } catch (err) {
        console.error(`Failed to place ${side} limit order: ${err.message}`);
    }
}

async function main() {
    // Read private key from a file (as an array of numbers)
    const privateKeyArray = JSON.parse(fs.readFileSync('private_key.txt', 'utf8').trim());
    const wallet = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray)); // Convert array to Uint8Array

    const connection = new Connection(RPC_URL, "confirmed");
    const jupiter = await Jupiter.load({
        connection,
        cluster: "mainnet-beta",
        user: wallet.publicKey,
    });

    const lastPrice = await getSOLLastPrice();
    console.log(`Last price of SOL: ${lastPrice} USDC`);

    const baseAmount = 1 * 1e9; // Amount in SOL (1 SOL in lamports)

    const tokenListResponse = await fetch(TOKEN_LIST_URL);
    const tokenList = await tokenListResponse.json();
    const solToken = tokenList.tokens.find(token => token.symbol === 'SOL');
    const usdcToken = tokenList.tokens.find(token => token.symbol === 'USDC');

    const tokenPair = {
        base: new PublicKey(solToken.address),
        quote: new PublicKey(usdcToken.address),
        price: lastPrice,
    };

    // Place a buy order 1% below last price
    tokenPair.price = lastPrice * 0.99;
    console.log(`Placing buy order at ${tokenPair.price} USDC`);
    await placeLimitOrder(connection, wallet, jupiter, tokenPair, baseAmount, 'buy');

    // Place a sell order 1% above last price
    tokenPair.price = lastPrice * 1.01;
    console.log(`Placing sell order at ${tokenPair.price} USDC`);
    await placeLimitOrder(connection, wallet, jupiter, tokenPair, baseAmount, 'sell');
}

main().catch(console.error);
