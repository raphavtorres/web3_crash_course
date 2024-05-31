import { ethers, run, network } from 'hardhat';

async function main() {
  // DEPLOYING CONTRACT
  const SimpleStorageContractFactory =
    await ethers.getContractFactory('SimpleStorage');
  console.log('deploying...');
  const simpleStorageContract = await SimpleStorageContractFactory.deploy();
  await simpleStorageContract.waitForDeployment();
  const contractAddress = await simpleStorageContract.getAddress();

  // VERIFYING CONTRACT PROGRAMMATICALLY
  // testing which network is being used
  // testing if is sepolia and if etherscan_api_key exists
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorageContract.deploymentTransaction()?.wait(6);
    await verify(contractAddress, []);
  }

  console.log(`Deployed contract to: ${contractAddress}`);

  // INTERACTING WITH CONTRACT
  const currentValue = await simpleStorageContract.retrieve(); // method created on contract
  console.log(`Current value: ${currentValue}`);

  // updating current value
  const transactionResponse = await simpleStorageContract.store(7); // method created on contract
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorageContract.retrieve();
  console.log(`Updated Value ${updatedValue}`);
}

async function verify(contractAddress: string, args: any[]) {
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!');
    } else {
      console.log(e);
    }
  }

  console.log('verifying...');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
