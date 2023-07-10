const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs'); 
const User = require('../models/User'); 
// or .fromAuthHeaderAsBearerToken() // Authorization : Bearer <token>
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'secretkey',
  };
const jwtStrategy = new JwtStrategy(jwtOpts , (payload , done )=> {
    User.findOne({where : {id : payload.id}})
    .then(user => {
        if(!user){
            return done(null , false); 
        }
        else{
            return done(null , user); 
        }
    })
    .catch(err => {
        return done(err , false); 
    });
})
passport.use(new LocalStrategy({usernameField : 'mobileNumber' , passwordField : 'password'},
    (mobileNumber , password , cb )=>{
        User.findOne({where : {mobileNumber : mobileNumber }})
        .then((user => {
            if (!user){return cb(null , false)};
            bcrypt.compare(password , user.password)
            .then(done => {
                if(!done){return cb(null , false)}
                else {return cb(null , user)}
            })
        })).catch(err => {
            cb(err); 
        });
    }
));
passport.use(jwtStrategy);

exports.authLocal = passport.authenticate('local' , {session : false});; 
exports.authJwt = passport.authenticate('jwt' , {session : false}); 

// passport.serializeUser((user , done)=>{
//     done(null , user.id); 
// });

// passport.deserializeUser((userId , done)=> {
//     User.findOne({where : {id : userId }})
//     .then(user => {
//         done(null , user)
//     }).catch(err => {
//         done(err);
//     });
// });

