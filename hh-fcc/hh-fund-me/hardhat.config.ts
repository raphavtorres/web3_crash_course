import 'solidity-coverage'
import 'hardhat-deploy'
import 'dotenv/config'
import 'hardhat-gas-reporter'
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-verify'
import '@nomicfoundation/hardhat-toolbox'

import { HardhatUserConfig } from 'hardhat/config'

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || 'https://eth-sepolia'
console.log(SEPOLIA_RPC_URL)
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'key'
const REPORT_GAS = process.env.REPORT_GAS

const config: HardhatUserConfig = {
  // solidity: '0.8.24',
  solidity: {
    compilers: [{ version: '0.8.24' }, { version: '0.6.6' }],
  },
  namedAccounts: {
    deployer: {
      default: 0,
      // net id
    },
    user: {
      default: 1,
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY!],
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
    enabled: REPORT_GAS ? true : false,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    // @ts-ignore
    L1: 'polygon',
  },
}

export default config
