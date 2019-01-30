pragma solidity ^0.5.0;

contract SimpleStorage {
  event AddedCID(string _hash);

  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function addCID(string memory _hash) public {
    emit AddedCID(_hash);
  }
}
