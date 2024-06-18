import { deployments, ethers, getNamedAccounts } from 'hardhat'

import { FundMe, MockV3Aggregator } from '../../typechain-types'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'

import { assert, expect } from 'chai'

describe('FundMe', function () {
  let fundMe: FundMe
  let mockV3Aggregator: MockV3Aggregator
  let deployer: string
  let signer: HardhatEthersSigner
  const sendValue = ethers.parseEther('1') // 1 ETH

  const ethProvider = ethers.getDefaultProvider()

  beforeEach(async function () {
    // deploy fundme contract
    // using hardhat-deploy

    // const accounts = await ethers.getSigners()
    // const deployer = accounts[0]

    deployer = (await getNamedAccounts()).deployer
    signer = await ethers.getSigner(deployer)

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

  describe('constructor', function () {
    it('sets the aggregator address correctly', async function () {
      const response = await fundMe.s_priceFeed()
      assert.equal(response, await mockV3Aggregator.getAddress())
    })
  })

  describe('fund', function () {
    // test if contract fails when not enough eth is sent
    it('Fails when not enough ETH is sent', async function () {
      // expecting that will fail
      await expect(fundMe.fund()).to.be.revertedWith(
        'You need to spend more ETH!'
      )
    })

    it('Updates the amount funded data structure', async function () {
      await fundMe.fund({ value: sendValue })
      // getting the amount we actually sent
      const amountFunded = await fundMe.s_addressToAmountFunded(signer)
      assert.equal(amountFunded.toString(), sendValue.toString())
    })

    it('Adds funder do funders array', async function () {
      await fundMe.fund({ value: sendValue })
      const funder = await fundMe.s_funders(0)
      assert.equal(funder, deployer)
    })
  })

  describe('withdraw', function () {
    beforeEach(async function () {
      await fundMe.fund({ value: sendValue })
    })

    it('Withdraw ETH from a single founder', async function () {
      // Arrange
      // Act
      // Assert
    })
  })
})
