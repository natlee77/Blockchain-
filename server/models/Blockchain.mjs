import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';
import   writeFile    from  '../utilities/fileHandler.mjs' ; 
export default class Blockchain {
  constructor() {
    this.chain = [];
    // create genesis(1) block... 
     this.createBlock(Date.now(), '0000', '0000', [{ "data" : "Genesis Block"}]);
  }
  // Metod för att lägga till ett nytt block i kedjan...
  createBlock(timestamp, previousBlockHash, currentBlockHash, data) {
    // Skapa blocket...
    const block = new Block(     
      this.chain.length + 1,
      timestamp,
      previousBlockHash,
      currentBlockHash,
      data
    );

    this.chain.push(block);
    return block;
  }
  //return last { } block
  getLastBlock() {
    return this.chain.at(-1);
  }
//hash 256-bits sized string
//node have crypto lib  ./utilities/crypto-lib.mjs
  hashBlock(timestamp, previousBlockHash, currentBlockData, nonce) {
    const stringToHash =
         timestamp.toString() +
         previousBlockHash +
         JSON.stringify(currentBlockData) +
         nonce;
    const hash = createHash(stringToHash);

     return hash;
    }

  proofOfWork(timestamp, previousBlockHash, data) {
    const DIFFICULTY_LEVEL = process.env.DIFFICULTY;
    // calculate hash with nonce from 0 to 2^256 - 1
    let nonce = 0;
    let hash = this.hashBlock(timestamp, previousBlockHash, data, nonce);
     //  while (hash.substring(0,3) !== '000' )    
  while ( hash.substring(0, DIFFICULTY_LEVEL) !== '0'.repeat(DIFFICULTY_LEVEL) ) 
  {
      nonce++;
      hash = this.hashBlock(timestamp, previousBlockHash, data, nonce);
     
    }
    console.log(hash);
    console.log(nonce);
    return nonce;
  }
}
