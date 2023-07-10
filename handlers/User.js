const {db} = require('../util/firebase/admin'); 

exports.users = async(req , res , next )=> {
    const users = db.collection('users');
    try{
        users.get().then(result => {
            const data = result.docs.map(doc => ({
                id : doc.id , 
                ...doc.data()
            }))
            console.log(data); 
            return res.status(200).json(data) ;
        }).catch(err=> {
            throw err ; 
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message : err.message 
        })
    }
}