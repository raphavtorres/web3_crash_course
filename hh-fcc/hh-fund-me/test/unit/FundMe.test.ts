import { deployments, ethers, getNamedAccounts } from 'hardhat'

import { FundMe, MockV3Aggregator } from '../../typechain-types'
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

describe('FundMe', function () {
  let fundMe: FundMe
  let mockV3Aggregator: MockV3Aggregator
  let deployer: SignerWithAddress

  beforeEach(async function () {
    // deploy fundme contract
    // using hardhat-deploy

    // const accounts = await ethers.getSigners()
    // const deployer = accounts[0]

    const deployer = (await getNamedAccounts()).deployer
    const signer = await ethers.getSigner(deployer)

    await deployments.fixture(['all'])
    const fundMeDeployment = await deployments.get('FundMe')
    const mockV3AggregatorDeployment = await deployments.get('MockV3Aggregator')

    fundMe = await ethers.getContractAt(
      'FundMe',
      fundMeDeployment.address,
      signer
    )

    mockV3Aggregator = await ethers.getContractAt(
      'MockV3Aggregator',
      mockV3AggregatorDeployment.address,
      signer
    )
  })

  describe('constructor', async function () {
    it('sets the aggregator address correctly', async function () {
      const response = await fundMe.s_priceFeed
      // assert.equal(response, mockV3Aggregator.ad)
    })
  })
})
