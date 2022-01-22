const SHA256= require('crypto-js/sha256')
fs=require('fs')
const crypto = require('crypto');

class Block {
    /**
     * @param {number} timestamp
     * @param {string} previousHash
     */
    constructor(index,timestamp, data, previousHash = '') {
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.data = data; //in our case data will be the link of the UC
      this.index = index;
      this.nonce=0
      this.hash=this.calculateHash();

    }

    calculateHash() {
        
      const fileBuffer = fs.readFileSync(this.data);
      const hashSum = crypto.createHash('sha256');
      hashSum.update(fileBuffer);
      const hex = hashSum.digest('hex');
        return SHA256(this.index + this.previousHash + this.timestamp + hex+this.nonce).toString();
      }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
          this.nonce++;
          this.hash = this.calculateHash();
        }
    
        console.log(`Block mined: ${this.hash}`);
      }
    
}

class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
      this.difficulty=2;
    }
  
    createGenesisBlock() {
      return new Block(0,Date.parse('2022-01-01'), "C:/Users/LEnovo X250/OneDrive/Bureau/blockchain UC/test.txt", '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
      }
    
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;


