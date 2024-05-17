import Chain from '../data/blocks.json'with {  type: 'json'};
import ResponseModel from '../models/ResponseModel.mjs';
import {    writeFile } from '../utilities/fileHandler.mjs';
import {
  blockchain
} from '../startup.mjs';

export const getBlockChain = (req, res, next) => {
   
   
  
  if (  Chain.chain === undefined || Chain.chain ===0)
  { 
    try {
      res.status(200).json(new ResponseModel({
        statusCode: 200,
        data: blockchain
      })); 
      writeFile('data', 'blocks.json', blockchain);
    } catch (error) {
      res.status(500).json(new ResponseModel({
        statusCode: 500,
        error: 'Internal Server Error '
      })); 
    }
  }else{
    res.status(200).json(new ResponseModel({
      statusCode: 200,
      data: Chain
    })); 
   
  }
   
}

export const createBlock = (req, res, next) => {
  try {
    const timestamp = Date.now();
    const data = req.body; //data in postman
    const lastBlockHash = Chain.chain.at(-1).currentBlockHash;
    const nonce = blockchain.proofOfWork(
      timestamp,
      lastBlockHash,
      data);
    const difficulty = blockchain.proofOfWork(timestamp, lastBlockHash, data).DIFFICULTY_LEVEL;

    const currentBlockHash = blockchain.hashBlock(
      timestamp, 
      lastBlockHash, 
      nonce,
      difficulty);
 
    //create block
    const block = blockchain.createBlock(    
      timestamp,
      lastBlockHash,
      currentBlockHash,
      data,
      difficulty
    )

   blockchain.networkNodes.forEach(async(url) => {
    const body = { block };
    await fetch(`${url}/api/v1/blockchain/block/broadcast`, {
      method: 'POST', 
      body: JSON.stringify(body), 
      headers: {
        'Content-Type': 'application/json'},
      }); 
    })  


    
    
    //save to .json  
    Chain.chain.push(block);
    writeFile('data', 'blocks.json', Chain );   

    res.status(201).json(new ResponseModel({
      statusCode: 200,
      data: { message: 'block created and distributed'  ,block }, 
    }));


  } catch (error) {
    res.status(500).json(new ResponseModel({
      statusCode: 500,
      error: 'you cannot create block:('
    }));
  }
  
}; 
export const getBlock = (req, res, next) => {
  try {
    const index = parseInt(req.params.index) - 1; //index in Array 
    if (index >= 0 && index < blockchain.chain.length) {
      const block = blockchain.getBlockByIndex(index);
      res.status(200).json(new ResponseModel({
        statusCode: 200,
        data: block
      }));
    } else {
      res.status(404).json(new ResponseModel({
        statusCode: 404,
        error: `Block with blockIndex ${index} not found :(`
      }));
    }
  } catch (error) {
    res.status(500).json(new ResponseModel({
      statusCode: 500,
      error: 'Internal Server Error'
    }));
  }
}
//controll chain updated-actuelt
export const updateChain = (req, res, next) => {
  const block = req.body.block;
  const lastBlock = blockchain.getLastBlock();
  const lastBlockHash = lastBlock.currentBlockHash===block.previousBlockHash 
  const index = lastBlock.index + 1 === block.blockIndex; 

  if (lastBlockHash && index) {
    blockchain.chain.push(block);
    res.status(201).json(new ResponseModel({
      statusCode: 201,
      data:{ 
        message: 'block created and can be distributed',
        block:block}
    }));
  } else {
    res.status(500).json(new ResponseModel({
      statusCode: 500,
      error: 'you cannot update chain'
    }));
  }
}

//___________________________
  export const synchronizeChain = (req, res, next) => {
  // Ta reda på aktuellt antal block i kedjan.
  const currentLength = blockchain.chain.length;
  let maxLength = currentLength;
  let longestChain = null;

  // Gå igenom alla noder i memberNodes för aktuellt node...
  blockchain.networkNodes.forEach(async (member) => {
    const response = await fetch(`${member}/api/v1/blockchain`);
   
    if (response.ok) {
      const result = await response.json();
      // console.log('result.lengt-', result.data.chain.length,                 
      //              " currentLength-", currentLength, 
      //              "maxLength-", maxLength);
   
      if (result.data.chain.length > maxLength) {
        maxLength = result.data.chain.length;
        longestChain = result.data.chain;       
      }
      // console.log('longestChain', longestChain);
      if (
         !longestChain ||  
         (longestChain && !blockchain.validateChain(longestChain)))
       {
        console.log('Synchronized already');
        // console.log('longestChain', longestChain); 
      } else {
        blockchain.chain = longestChain;
        console.log(blockchain); 
        console.log('Synchronized now');
        
          writeFile('data', 'blocks.json', blockchain.networkNodes );
       }

     
    
    }
    
  });

res.status(200).json( new ResponseModel({ statusCode: 200, data:  `Synchronisering with  are finished  `  }));
//${member}
 

  };
 