//path that works cross platform
const path = require('path');
const fs = require('fs');
//allows solidity reading
const solc =require('solc');


//path to inbox sol file
const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
//read in the contents of the source file. utf8 is the encoding of the file
const source = fs.readFileSync(inboxPath, 'utf8');
//direct access to the bytecode property and interface(ABI)
module.exports = solc.compile(source, 1).contracts[':Inbox'];
