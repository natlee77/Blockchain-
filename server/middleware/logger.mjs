import fs from 'fs';
import path  from 'path';

const logger = (req, res, next) => {
//   path (__appdir-catalog  , ! __dirname(same folder as we now is))
  const filePath = path.join(__appdir, 'logs' ,'error.log'  );
  console.log('filePath -----', filePath);
  
//____msg
  const message = `${req.method} ${req.originalUrl} - 
  ${new Date().toLocaleDateString('sv-SE')} 
  ${new Date().toLocaleTimeString('sv-SE')}\n`;
  //  console.log(message);
//____save msg to log file
  fs.appendFileSync(filePath, message);

  next();
};

export default logger