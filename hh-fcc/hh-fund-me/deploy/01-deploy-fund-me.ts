import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { network } from 'hardhat'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy, log } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()
  const chainId = network.config.chainId

  // when going to localhost or hardhat network --> use a mock
  const fundMe = await deploy('FundMe', {
    // who is deploying
    from: deployer,
    args: [
      /* address? */
    ],
    log: true,
  })
}
export default func
