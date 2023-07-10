const express = require('express'); 
const app = express(); 
const path = require('path');
const sequelize = require('./util/database');
const passport = require('passport');
const multer = require('multer'); 
const authRouter = require('./routers/auth');
const productRouter = require('./routers/product');
const categoryRouter = require('./routers/category');
const offerRouter = require('./routers/offer');
const orderRouter = require('./routers/order');
const Category = require('./models/Category');
const Product = require('./models/Product'); 
const Offer = require('./models/Offer');
const Rate = require('./models/Rate'); 
const User = require('./models/User');
const Order = require('./models/Order');
const {fileFilter , fileStore} = require('./middlewares/multer');
// require('./util/passport');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use('/images',express.static(path.join(__dirname , 'images')));
app.use(multer({storage : fileStore , fileFilter : fileFilter}).single('image'));
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(offerRouter);
app.use(orderRouter);
app.use(( error , req , res , next )=>{
    const status = error.statusCode || 500 ; 
    const message = error.message ; 
    return res.status(status).json({
        message : message 
    });
});

Category.belongsTo(Category , {foreignKey : 'parent_id' ,constraints : true , onDelete : 'CASCADE'});
Category.hasMany(Category,{foreignKey : 'parent_id'});

Product.belongsTo(Category);
Offer.belongsTo(Product , {constraints : true , onDelete : 'CASCADE'});
Product.hasMany(Offer);

// const dropForeignKeyQuery = `ALTER TABLE models DROP FOREIGN KEY models_ibfk_1`;
// sequelize.query(dropForeignKeyQuery)
//   .then(() => {
//     console.log('Foreign key constraint dropped successfully!');
    
//     const dropProductsTableQuery = `DROP TABLE products`;

//     sequelize.query(dropProductsTableQuery)
//       .then(() => {
//         console.log('Products table dropped successfully!');
//       })
//       .catch(error => {
//         console.error('Error dropping products table:', error);
//       });
//   })
//   .catch(error => {
//     console.error('Error dropping foreign key constraint:', error);
//   });
// sequelize.query('DROP TABLE models').then(()=>{
//     console.log('models table dropped successfully');
// }).catch(error =>{
//     console.log(error);
// })
sequelize.sync()//{force : true }
.then(result => {
    console.log('result'); 
    app.listen(3000);
})
.catch(err => console.log(err));