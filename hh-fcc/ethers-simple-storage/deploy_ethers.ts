import { ethers } from "ethers";
import * as fs from "fs-extra";
import "dotenv/config";

async function main() {
  // connecting script to blockchain
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  // instantiating wallet with account and provider information
  const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const ABI = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const BINARY = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8",
  );

  // ======= DEPLOY USING ETHERS =======
  const contractFactory = new ethers.ContractFactory(ABI, BINARY, WALLET);
  console.log("DEPLOYING...");
  const contract = await contractFactory.deploy();
  // console.log(contract);

  // ======= GETTING BLOCK CONFIRMATION AND RECEIPT =======
  await contract.deployTransaction.wait(1); // waiting block confirmation
  // console.log("Deployment Transaction (transaction reponse): ");
  // console.log(contract.deployTransaction);

  // console.log("Transaction Receipt: ");
  // console.log(transactionReceipt);

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
