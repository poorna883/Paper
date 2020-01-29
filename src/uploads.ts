// const multer = require('multer');
// const path   = require('path');

// const storageEngine = multer.diskStorage({
//     destination: './public/files',
//     filename: function(req, file, fn){
//       fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
//     }
//   }); 
//   //init
//   const upload =  multer({
//     storage: storageEngine,
//     limits: { fileSize:200000 },
//     fileFilter: function(req, file, callback){
//       validateFile(file, callback);
//     }
//   }).single('photo');
//   var validateFile = function(file, cb ){
//     var allowedFileTypes = /pdf/;
//     const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType  = allowedFileTypes.test(file.mimetype);
//     if(extension && mimeType){
//       return cb(null, true);
//     }else{
//       cb("Invalid file type. Only pdf files are allowed.")
//     }
//   }
//   module.exports = upload;