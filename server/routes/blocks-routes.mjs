import express  from  'express';
import {   
  getBlockChain,
  createBlock,
   getBlock,
  synchronizeChain,
  updateChain,
}  from '../controllers/controller.mjs' ;

const router = express.Router();

router.route('/').get(getBlockChain)

  router.route('/block/:index').get(getBlock) 

router.route('/mine').post(createBlock) 

router.route('/concensus').get(synchronizeChain)  

router.route('/block/broadcast').post(updateChain);

export default router;
