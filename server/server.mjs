import express from 'express'; 
import logger  from './middleware/logger.mjs';
import errorHandler  from './middleware/errorHandlerLogger.mjs' ;
import blocksRouter  from './routes/blocks-routes.mjs' ;
import membersRouter  from  './routes/member-routes.mjs' ;
import ErrorResponse  from './models/ErrorResponseModel.mjs';
// Lösningen på att få tag i __dirname för ES6 modul sökvägen.
import path from 'path';
import { fileURLToPath } from 'url'; // node 
  
const app = express();
//______root-catalog in node.js global  object 
const filename = fileURLToPath(import.meta.url);
console.log('_________filename: ', filename);
const dirname = path.dirname(filename);
console.log('_________dirname: ', dirname);
global.__appdir = dirname;


 
//  Middleware...körs som de plaseras automatisk--ex: felhantering, inlogning controll-logger.js
app.use(express.json()); 
//endpoints
app.use('/api/v1/blockchain', blocksRouter);
app.use('/api/v1/members', membersRouter);
// _____Catch all url 
app.all('*', (req, res, next) => {   
  //error msg in postman  
  next(new  ErrorResponse(` can not find URL resurs ${req.originalUrl}` ,404  ));
}); 
//______ Central felhantering...
 app.use(errorHandler); 

if (process.env.NODE_ENV === 'development') {
  console.log('______I am in :)______');
  app.use(logger);
}

const PORT = process.argv[2] || 5011;
// start server
app.listen(PORT, () =>
  console.log(` Server is running in ____  ${process.env.NODE_ENV} mode ____ on port ${PORT}`)
);
