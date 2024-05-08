import express  from  'express';
import {   
  getBlockChain,
  createBlock,
  getBlock
}  from '../controllers/controller.mjs' ;

const router = express.Router();

router.route('/')
.get(getBlockChain)

router.route('/:index')
.get(getBlock)
 

router
  .route('/mine') 
  .post(createBlock) 
   

export default router;
