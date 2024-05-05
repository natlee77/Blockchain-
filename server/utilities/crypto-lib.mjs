import { log } from 'console';
import crypto from 'crypto';

//   "d17f25ecfbcc7857f7bebea469308be0b2580943e96d13a3ad98a13675c4bfc2"
export const createHash = (stringToHash) => {
  return crypto.createHash('sha256')
               .update(stringToHash)
               .digest('hex');
  
};
// ---> 0x  "hex-hash 256-bits sized string"
