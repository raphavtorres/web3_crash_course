import { network } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} from '../helper-hardhat-config'

const deployMocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deploy, log } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()
  const chainId = network.config.chainId

  if (developmentChains.includes(network.name)) {
    log('Local network detected! Deploying mocks...')
    await deploy('MockV3Aggregator', {
      contract: 'MockV3Aggregator',
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    })
    log('Mocks deployed!')
    log('----------------------------')
  }
}

export default deployMocks
deployMocks.tags = ['all', 'mocks']
