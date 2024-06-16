// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import './PriceConverter.sol';

/**
 * @title A contract for crowd funding
 * @author Raphael Torres
 * @notice This contract is to demo a sample funding contract
 * @dev This implements price feeds as our library
 */
contract FundMe {
  using PriceConverter for uint256;

  mapping(address => uint256) public s_addressToAmountFunded;
  address[] public s_funders;
  address public s_owner;
  AggregatorV3Interface public s_priceFeed;

  modifier onlyOwner() {
    require(msg.sender == s_owner);
    _;
  }

  constructor(address priceFeed) {
    s_priceFeed = AggregatorV3Interface(priceFeed);
    s_owner = msg.sender;
  }

  /**
   * @notice This function funds this contract
   * @dev This implements price feeds as our library
   */
  function fund() public payable {
    uint256 minimumUSD = 50 * 10 ** 18;
    require(
      msg.value.getConversionRate(s_priceFeed) >= minimumUSD,
      'You need to spend more ETH!'
    );
    // require(PriceConverter.getConversionRate(msg.value) >= minimumUSD, "You need to spend more ETH!");
    s_addressToAmountFunded[msg.sender] += msg.value;
    s_funders.push(msg.sender);
  }

  function getVersion() public view returns (uint256) {
    return s_priceFeed.version();
  }

  function withdraw() public payable onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
    for (
      uint256 funderIndex = 0;
      funderIndex < s_funders.length;
      funderIndex++
    ) {
      address funder = s_funders[funderIndex];
      s_addressToAmountFunded[funder] = 0;
    }
    s_funders = new address[](0);
  }

  function cheaperWithdraw() public payable onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
    address[] memory funders = s_funders;
    // mappings can't be in memory, sorry!
    for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
      address funder = funders[funderIndex];
      s_addressToAmountFunded[funder] = 0;
    }
    s_funders = new address[](0);
  }
}
