import express from 'express';
import dotenv  from 'dotenv';
import cors    from 'cors';
import logger  from './middleware/logger.mjs';
import errorHandler  from './middleware/errorHandler.mjs' ;
import blocksRouter  from './routes/blocks-routes.mjs' ;
import ErrorResponse  from './models/ErrorResponseModel.mjs';
// Lösningen på att få tag i __dirname för ES6 modul laddaren...
import path from 'path';
import { fileURLToPath } from 'url'; // node 
 
dotenv.config({ path: './config/config.env' });//NOVE_ENV

const app = express();


// Placera rotsökvägen i node.js globala objekt...
const filename = fileURLToPath(import.meta.url);
// console.log('_________filename: ', filename);

const dirname = path.dirname(filename);
// console.log('_________dirname: ', dirname);
global.__appdir = dirname;
//  Middleware...körs som de plaseras automatisk--ex: felhantering, inlogning controll-logger.js
app.use(express.json());
app.use(cors());
app.use('/api/v1/blockchain', blocksRouter);

// Catch all url...ligga sist efrer alla resurs URL
app.all('*', (req, res, next) => {   
  //_____error msg in postman  
  next(new  ErrorResponse(`can not find URL resurs ${req.originalUrl}` ,404, ));
});//efter --> app.use(errorHandler);

//______ Central felhantering...
 app.use(errorHandler); 

if (process.env.NODE_ENV === 'development') {
  console.log('______I am in :)______');
  app.use(logger);
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
