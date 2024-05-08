export default class Block {
    constructor(   
      blockIndex,
      timestamp,
      previousBlockHash,
      currentBlockHash,
      data,
      difficulty
    ) {
      this.blockIndex = blockIndex;
      this.timestamp = timestamp;//Date.now()     
      this.previousBlockHash = previousBlockHash;
      this.currentBlockHash =   currentBlockHash ;
      this.data = data;
      this.difficulty = difficulty //|| process.env.DIFFICULTY;
    }
  }
  