import { HardhatUserConfig } from 'hardhat/config';
import 'dotenv/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';
import './tasks/block-number';
import 'hardhat-gas-reporter';

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia';
const PRIVATE_KEY = process.env.PRIVATE_KEY! || '0xkey';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key';
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'key';

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'hardhat',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      // hardhat already gives the accounts
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: false,
  },
  gasReporter: {
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    enabled: true,
    L1: 'polygon',
    // outputJSONFile: 'gas-report.json',
    // outputJSON: true,
    // outputFile: 'gas-report.txt',
    // noColors: true,
  },
};

export default config;
