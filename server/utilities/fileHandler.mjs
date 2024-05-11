import fs  from 'fs';
import path   from 'path';
 
 

export const writeFile = (folderName, fileName, data) => {
  try {
     const filePath = path.join( __appdir , folderName, fileName);
     fs.writeFileSync(filePath, JSON.stringify(data));
  } catch (error) {
    throw new Error(error.message);
  }
};
 export const addToFile = (folderName, fileName, data) => {
//    try {
//      const filePath = path.join(__appdir, folderName, fileName);
//      fs.appendFileSync(filePath, JSON.stringify(data));
//    } catch (error) {
//      throw new Error(error.message);
//    }
  }
 

