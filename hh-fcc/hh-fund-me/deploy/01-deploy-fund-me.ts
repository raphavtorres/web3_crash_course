import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { deployments, network } from 'hardhat'
import { developmentChains, networkConfig } from '../helper-hardhat-config'
import verify from '../utils/verify'

const deployFundMe: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deploy, log } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()
  const chainId = network.config.chainId

  let ethUsdPriceFeedAddress: string

  // if localhost
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get('MockV3Aggregator')
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[network.name].ethUsdPriceFeed!
  }

  // when going to localhost or hardhat network --> use a mock
  // so, deploying a mock

  log('----------------------------------------------------')
  log('Deploying FundMe and waiting for confirmations...')
  log([ethUsdPriceFeedAddress])

  const fundMe = await deploy('FundMe', {
    // who is deploying
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })

  log(`FundMe deployed at ${fundMe.address}`)

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // verify
    await verify(fundMe.address, [ethUsdPriceFeedAddress])
  }

  log('---------------')
}

export default deployFundMe
deployFundMe.tags = ['all', 'fundme']
