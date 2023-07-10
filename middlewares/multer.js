
const multer = require('multer'); 

exports.fileStore = multer.diskStorage({
    destination : (req , file , cb )=> {
        cb(null , 'images');
    },
    filename : (req , file , cb )=> {
        // console.log(Date.now()+'-'+file.originalname)
        cb(null , Date.now()+'-'+file.originalname); 
    }
});

exports.fileFilter = (req , file , cb )=> {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/'){
        cb(null , true );
    }else {
        cb(null , false ); 
    }
}; 

