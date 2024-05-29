const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  // connecting script to local blockchain
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // instantiating wallet with account and provider information
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8",
  );

  // ======= GETTING BLOCK CONFITMATION AND RECEIPT =======
  await contract.deployTransaction.wait(1); // waiting block confirmation
  // console.log("Deployment Transaction (transaction reponse): ");
  // console.log(contract.deployTransaction);

  // console.log("Transaction Receipt: ");
  // console.log(transactionReceipt);

  // ======= DEPLOY USING ONLY TRANSACTION DATA =======
  const nonce = await wallet.getTransactionCount();
  const transaction = {
    nonce: nonce,
    gasPrice: "20000000000",
    gasLimite: "1000000",
    to: null,
    value: 0,
    data: "0x608...",
    chainId: 5777,
  };
  const sentTransacResponse = await wallet.sendTransaction(transaction);
  // sendTransaction() - automatically signs transaction
  await sentTransacResponse.wait(1);
  console.log(sentTransacResponse);

  // getting favorite number
  const currentFavoriteNumer = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumer.toString()}`);
  // updatating favorite number
  const transactionResponse = await contract.store("7");
  await transactionResponse.wait(1); // transaction receipt
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite number is: ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
