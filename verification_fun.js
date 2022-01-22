const SHA256= require('crypto-js/sha256')
fs=require('fs')
const crypto = require('crypto');



function verifyBlockChain(BlockChain) {
    // Check if the Genesis block hasn't been tampered with by comparing
    // the output of createGenesisBlock with the first block on our chain
    

    // Check the remaining blocks on the chain to see if there hashes and
    // signatures are correct
    for (let i = 1; i < BlockChain.chain.length; i++) {
      
      const currentBlock = BlockChain.chain[i];
      const previousBlock = BlockChain.chain[i - 1];
    //divide file to buffers and hash it
      const fileBuffer = fs.readFileSync(currentBlock.data);
      const hashSum = crypto.createHash('sha256');
      hashSum.update(fileBuffer);
      const hex = hashSum.digest('hex'); // hash of file

      //using the hash of file "hex" and other data to create a hash for the block
      const block_hash= SHA256(currentBlock.index + currentBlock.previousHash + currentBlock.timestamp + hex+currentBlock.nonce).toString()


      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      if (currentBlock.hash !== block_hash) {
        return false;
      }
    }

    return true;
  }

  module.exports={verifyBlockChain};