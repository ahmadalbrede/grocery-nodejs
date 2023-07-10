const otpGenertor = require('otp-generator'); 

module.exports.genertorOTP = (req , res )=> {
        // Declare a digits variable 
        // which stores all digits
        // var digits = '0123456789';
        // let OTP = '';
        // for (let i = 0; i < 4; i++ ) {
        //     OTP += digits[Math.floor(Math.random() * 10)];
        // }
    //////////////////////////////////////////
    const OTP = otpGenertor.generate(4 , {  alphabets: false, upperCase: false, specialChars: false ,upperCaseAlphabets:false ,chars : false})
    // return OTP ;
    return res.status(200).json({
        otp : OTP
    });
}