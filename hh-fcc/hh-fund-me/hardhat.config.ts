import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-deploy'

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
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
}

export default config
