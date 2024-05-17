import { GENESIS_DATA } from '../utilities/config.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';
import Chain from '../data/blocks.json'with {  type: 'json'};

let DIFFICULTY_LEVEL = +process.env.INITIAL_DIFFICULTY;

export default class Blockchain {
  constructor() {
    if  (!this.chain) { 
    this.chain = [];
    // noder  that are connected to the network
    this.networkNodes = [];
    this.nodeUrl =process.argv[3]; //99% url
    // console.log("nodeUrl- ", process.argv[3]);
    // create genesis(1) block... 
     this.createBlock(GENESIS_DATA );
  }
}
  // Metod to create block
  createBlock(  timestamp, 
                previousBlockHash, currentBlockHash, 
                data,  
                difficulty)   {
    //______ create block 
    const block = new Block( 
      // this.chain.length + 1,  
      Chain.chain.length + 1,
      timestamp,    
      previousBlockHash,
      currentBlockHash,
      data,
      DIFFICULTY_LEVEL
    );
console.log('block - ', block);

    this.chain.push(block);
    return block; 
  }
  getBlockByIndex(index) {
    return this.chain[index];
  }
  //return last block
  getLastBlock() {
    return this.chain.at(-1);
  }
//hash 256-bits sized string
//node have crypto lib  ./utilities/crypto-lib.mjs
  hashBlock(timestamp, previousBlockHash, currentBlockData, nonce, difficulty) {
    const stringToHash =
         timestamp.toString() +
         previousBlockHash +
         JSON.stringify(currentBlockData) +
         nonce +
         DIFFICULTY_LEVEL;
    const hash = createHash(stringToHash);

     return hash;
    }

  proofOfWork(timestamp, previousBlockHash, data) { 
    // calculate hash with nonce from 0 to 2^256 - 1
    let nonce = 0;
    let hash = this.hashBlock(timestamp, previousBlockHash, data, nonce);
    let currentTime;
     //  while (hash.substring(0,3) !== '000' )    
  while ( hash.substring(0, DIFFICULTY_LEVEL) !== '0'.repeat(DIFFICULTY_LEVEL) ) 
  {
      nonce++;
      currentTime = Date.now();
      DIFFICULTY_LEVEL = this.changeDifficulty(currentTime);
      hash = this.hashBlock(currentTime, previousBlockHash, data, nonce);
     
    }
  
    console.log('nonce- ',nonce,
                'DIFFICULTY_LEVEL- ',DIFFICULTY_LEVEL);
    return {nonce,   DIFFICULTY_LEVEL};
     
  }

 changeDifficulty(currentTimestamp ) 
 {
    let difficulty = +this.getLastBlock().difficulty;
    const  MINE_RATE = +process.env.MINE_RATE;
    let      timestamp  = this.getLastBlock().timestamp;
    
    difficulty = timestamp + MINE_RATE  > currentTimestamp
      ?  difficulty + 1  
      :  difficulty - 1 ; 
 
    return difficulty;
 }

 validateChain(blockchain) {
  let isValid = true;

  // go trough each block in the chain to validate by hash
  for (let i = 1; i < blockchain.length; i++) {
    const block = blockchain[i];
    console.log(block);
    const previousBlock = blockchain[i - 1];//

    const hash = this.hashBlock(
      block.timestamp,
      previousBlock.currentBlockHash,
      block.data,
      block.nonce,
      block.difficulty
    );

    if (hash !== block.currentBlockHash) isValid = false;
    if (block.previousBlockHash !== previousBlock.currentBlockHash)
      isValid = false;
  }

  return isValid;
}
} 
 
