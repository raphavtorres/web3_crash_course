import { ethers } from 'hardhat';
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';
import { assert, expect } from 'chai';

describe('SimpleStorage', function () {
  let contractFactory: SimpleStorage__factory, contract: SimpleStorage;

  // what we will do before each test
  beforeEach(async function () {
    contractFactory = await ethers.getContractFactory('SimpleStorage');
    contract = await contractFactory.deploy();
  });

  it('Should start with a favorite number of 0', async function () {
    const currentValue = await contract.retrieve();
    const expectedValue = '0';

    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue);
  });

  it('Should update when we call store', async function () {
    const expectedValue = '7';
    const transactionResponse = await contract.store(expectedValue);
    await transactionResponse.wait(1);
    const updatedValue = await contract.retrieve();

    assert.equal(updatedValue.toString(), expectedValue);
  });

  it('Should add person', async function () {
    const expectedName = 'Raphael';
    const expectedNumber = 42;

    const transactionResponse = await contract.addPerson(
      expectedName,
      expectedNumber,
    );
    await transactionResponse.wait(1);

    const person = await contract.people(0);
    const personFavoriteNumber = person.favoriteNumber;
    const personName = person.name;
    const mappingFavoriteNumber =
      await contract.nameToFavoriteNumber(expectedName);

    expect(personName).to.equal(expectedName);
    expect(personFavoriteNumber).to.equal(expectedNumber);
    expect(mappingFavoriteNumber).to.equal(expectedNumber);
  });
});
