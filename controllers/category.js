const Category = require('../models/Category'); 

exports.createCategory = (req , res , next )=> {
    const {title , parent_id } = req.body;
    const image = req.file ; 
    if(!image){
        const error = new Error('the image is required '); 
        error.statusCode =  422 ; 
        throw error; 
    };
    Category.create({
        title : title , 
        parent_id : parent_id ,
        imageUrl : image.path
    }).then(result => {
        return res.status(201).json({
            categoryDate : result 
        });
    }).catch(err => {
        if(err.statusCode){
            err.statusCode = 500 ;
        }
        next(err); 
    })
}
exports.getCategories = async(req , res , next)=> {
    const categories = await Category.findAll({
        where : {parent_id : null},attributes: ['id','title', 'imageUrl']
    });
    return res.status(200).json({
        success : true ,
        categoriesData : categories
    });
};

exports.getCategoriesForCategory = async(req , res , next)=> {
    const parent_id = req.query.parent_id ; 
    const categories = await Category.findAll({
        where : {parent_id : parent_id}, 
        attributes : [ 'id' ,'imageUrl' , 'title']
    });
    return res.status(200).json({
        success : true ,
        categoriesData : categories
    });
};