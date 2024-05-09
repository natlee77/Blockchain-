import { blockchain } from '../startup.mjs';
 
import ResponseModel from '../models/ResponseModel.mjs';

export const listMembers = (req, res, next) => {
    console.log('listMembers_______', blockchain.networkNodes);
  try {
   res.status(200).json( new ResponseModel({   statusCode: 200, data: blockchain.networkNodes }));
  } catch (error) {
    res.status(500).json( new ResponseModel({ statusCode: 500, error: 'can not list members ' }));
  } 
};

export const registerNode = (req, res, next) => {
  // Ta ut ur req.body adressen till servern som vill bli medlem...
  const node = req.body;    

  if ( blockchain.networkNodes.indexOf(node.nodeUrl) === -1  ) //have already  
  {
    if ( process.argv[3] === node.nodeUrl) // check if node is blockchain node
    {
      res.status(400).json( new ResponseModel({ 
        statusCode: 400,
        error: `Node ${node.nodeUrl} are blockchain node ` 
      })) ;
    }else {
      blockchain.networkNodes.push(node.nodeUrl);
    //syncronize members, send new node/member to all members, 
     syncMembers( node.nodeUrl ); 

      res.status(201).json( new ResponseModel({
      statusCode: 201,
      data: { message: `Node  ${node.nodeUrl} are registreted` },
    }));
  }
  } else {    
      res.status(400).json( new ResponseModel({ 
      statusCode: 400,
      data: { message: `Node ${node.nodeUrl} are already blockchain member ` },
    }));
     
  }
};
//syncronize members, send new node/member to all members,  
const syncMembers = (url) => {
  console.log('url--------', url  );
  // Create en array of all my members/nodes and add  my url...
  const members = [...blockchain.networkNodes, blockchain.nodeUrl];//...copy
  // Go through every member that  has in  members array 
  // efter send to evry member  list of members  
  try {
    members.forEach(async (member) => {
      const body = { nodeUrl: member };
      await fetch(`${url}/api/v1/members/register-node`, 
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  } catch (error) {
    res.status(500).json(new ResponseModel ({ error: "can not sync members", statusCode: 500 }));
  }
};
// res.status(500).json(new ResponseModel({
//   statusCode: 500,
//   error: 'you cannot create block:('
// }));