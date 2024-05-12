export const MINE_RATE = 1000;

export const INITIAL_DIFFICULTY = 2;

export const GENESIS_DATA = {
    blockIndex: 1,
    timestamp: Date.now(),
    lastHash: '00000',
    hash: '11111',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: [{
        data: 'Genesis Block'
    }],
}
