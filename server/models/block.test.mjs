import {
    describe,
    it,
    expect,
    beforeEach
} from 'vitest';
import Block from './Block.mjs';
import Blockchain from './Blockchain.mjs';
import {
    GENESIS_DATA,
    INITIAL_DIFFICULTY
} from '../utilities/config.mjs';



describe('Blockchain', () => {
    const blockchain = new Blockchain();
    //block
    const blockIndex = blockchain.chain.length + 1;
    const timestamp = Date.now();
    const previousBlockHash = 'test57567uyest';
    const currentBlockHash = ' ';
    const data = 'test data';
    const difficulty = +INITIAL_DIFFICULTY;


    const genesisBlock = blockchain.createBlock(GENESIS_DATA);
    const block = new Block(blockIndex, timestamp, previousBlockHash, currentBlockHash, data, difficulty);


    it('should return an instance of Blockchain class', () => {
        expect(blockchain instanceof Blockchain).toBe(true);
    });
    describe('Block', () => {


        describe('Propetries', () => {
            it('has `blockIndex` property', () => {
                expect(block).toHaveProperty('blockIndex');
            });
            it('has`timestamp` property', () => {
                expect(block).toHaveProperty('timestamp');
            });
            it('has `previousBlockHash` property', () => {
                expect(block).toHaveProperty('previousBlockHash');
            });
            it('has `currentBlockHash` property ', () => {
                expect(block).toHaveProperty('currentBlockHash');
            });
            it('has `data` property', () => {
                expect(block).toHaveProperty('data');
            });
            it('has `difficulty` property', () => {
                expect(block).toHaveProperty('difficulty');
            });
        });
        describe('Property values', () => {
            it(' should set `blockIndex`', () => {
                expect(block.blockIndex).toEqual(blockIndex);
            });
            it(' should set `timestamp` ', () => {
                expect(block.timestamp).not.toEqual(undefined);
            });
            it(' should set `previousBlockHash`  ', () => {
                expect(block.previousBlockHash).toEqual(previousBlockHash);
            });
            it(' should set `currentBlockHash` ', () => {
                expect(block.currentBlockHash).toEqual(currentBlockHash);
            });
            it(' should set `data`', () => {
                expect(block.data).toEqual(data);
            });

            it(' should set `difficulty`', () => {
                expect(block.difficulty).toEqual(difficulty);
            });

        });


    });


    describe('Methods', () => {
        describe('createBlock() function', () => {
            it('should return an instance of Block class', () => {
                expect(block instanceof Block).toBeTruthy();
            })
            it('should start with genesis block', () => {
                expect(blockchain.chain[0].block ).toEqual(genesisBlock); 
                  
            })
            it('should push block to chain', () => {
                blockchain.chain.push(block);
                expect(blockchain.chain.length -1 ).toEqual(block.blockIndex);
            })
        })

    })
})

 