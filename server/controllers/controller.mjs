import blocks from '../data/blocks.json'with {  type: 'json'};
import ResponseModel from '../models/ResponseModel.mjs';
import writeFile from '../utilities/fileHandler.mjs';
import {
  blockchain
} from '../startup.mjs';

export const getBlockChain = (req, res, next) => {
  try {

    res.status(200).json(new ResponseModel({
      statusCode: 200,
      data: blockchain.chain
    }));

  } catch (error) {
    res.status(500).json(new ResponseModel({
      statusCode: 500,
      error: 'Internal Server Error '
    }));
  }
  //save to .json
  //  writeFile('data', 'blocks.json', blockchain );   
};

export const createBlock = (req, res, next) => {
  try {
    const timestamp = Date.now();
    const data = req.body; //data in postman  
    // const lastBlock = blockchain.getLastBlock();
    const lastBlockHash = blockchain.getLastBlock().currentBlockHash
    const nonce = blockchain.proofOfWork(
      timestamp,
      lastBlockHash,
      data);
    const difficulty = blockchain.proofOfWork(timestamp, lastBlockHash, data).DIFFICULTY_LEVEL;
    const currentBlockHash = blockchain.hashBlock(timestamp, lastBlockHash, req.body, data, nonce);
    //create block
    const block = blockchain.createBlock(
      timestamp,
      lastBlockHash,
      currentBlockHash,
      data,
      difficulty
    )
    res.status(201).json(new ResponseModel({
      statusCode: 200,
      data: block
    }));


  } catch (error) {
    res.status(500).json(new ResponseModel({
      statusCode: 500,
      error: 'you cannot create block:('
    }));
  }
  //save to .json  
  // writeFile('data', 'blocks.json', blockchain );   
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
//___________________________
// export const addBlock = (req, res, next) => {
//   try { 
//     const block_Height =   
//       blocks.reduce((acc, b) => Math.max(acc, b.Block_Height), 0) + 1;
//       
//     req.body.Block_Height  =   block_Height;
//     console.log('____req.body : ',  req.body);

//     blocks.push(req.body);
//    //___________save to .json
//     writeFile('data', 'blocks.json', blocks);

//     res.status(201).json(new ResponseModel({ statusCode: 201, data: req.body }));
//   } catch (error) {
//     res.status(500).json(new ResponseModel({ statusCode: 500, error: 'Internal Server Error' }));
//   }
// };

// export const updateBlock = (req, res,next) => {
//   try {
//     const block = blocks.find((b) => b.Block_Height === +req.params.id);


//     if (!block) {
//       res.status(404).json(
//         new ResponseModel({
//           statusCode: 404,
//           error: `:( can not uppdate/find block id ${id}`,
//         })
//       );

//       return;
//     }

//     block.Status = req.body.Status ?? block.Status  ;
//     block.Timestamp = req.body.Timestamp ?? block.Timestamp;
//     block.Gas_Used = +req.body.Gas_Used ?? block.Gas_Used;
//     block.Gas_Limit = +req.body.Gas_Limit ?? block.Gas_Limit;
//     block.Hash = req.body.Hash ?? block.Hash;
//     block.Parent_Hash = req.body.Parent_Hash ?? block.Parent_Hash;


//     //save to .json 
//     writeFile('data', 'blocks.json', blocks);

//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json(new ResponseModel({ statusCode: 500, error: 'Internal Server Error' }));
//   }
// };
//?????????
// export const updateBlockStatus = (req, res) => {
//   try {
//     const block = blocks.find((b) => b.Block_Height === +req.params.id  );
//     block.status = req.body.status ?? block.status;
//     block.Timestamp = new Date().toLocaleDateString('sv-SE'); 
//     block.Gas_Used = +req.body.Gas_Used ?? block.Gas_Used;
//     //save to .json
//     writeFile('data', 'blocks.json', blocks);

//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json(new ResponseModel({ statusCode: 500, error: 'Internal Server Error' }));
//   }
// };
// //??????
// export const deleteBlock = (req, res) => {
//   try {
//     const block = blocks.find((b) => b.Block_Height === +req.params.id  );

//     if (!block) {
//       res.status(404).json(
//         new ResponseModel({
//           statusCode: 404,
//           error: `Kunde inte hitta någon produkt med id ${id} så det gick inte att ta bort`,
//         })
//       );

//       return;
//     }

//     blocks.splice(blocks.indexOf(block), 1);
//     //save to .json
//     writeFile('data', 'blocks.json', blocks);
//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json(new ResponseModel({ statusCode: 500, error: 'Internal Server Error' }));
//   }
// };