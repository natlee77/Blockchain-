import express  from  'express';
import {   
  getBlockChain,
  createBlock,
}  from '../controllers/controller.mjs' ;

const router = express.Router();

router.route('/')
.get(getBlockChain)
 

router
  .route('/mine') 
  .post(createBlock) 
   

export default router;
