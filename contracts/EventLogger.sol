// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EventLogger {
    event ActionLogged(address user, string message);

    function logAction(string memory _message) public {
        emit ActionLogged(msg.sender, _message);
    }
}