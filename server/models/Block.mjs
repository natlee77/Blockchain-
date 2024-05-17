 

export default class Block {
    constructor(   
      blockIndex,
      timestamp,
      previousBlockHash,
      currentBlockHash,
      data, 
      nonce,    
      difficulty
    ) {
      this.blockIndex = blockIndex;
      this.timestamp = timestamp;//Date.now()     
      this.previousBlockHash = previousBlockHash;
      this.currentBlockHash =   currentBlockHash ;
      this.data = data;  
      this.nonce = nonce;  
      this.difficulty = difficulty //|| process.env.DIFFICULTY;
    }
 

}
  