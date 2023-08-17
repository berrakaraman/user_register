// There is not Database 

const login =  async function(req,res,next){
    let checkUser = req.body;
    if(Object.keys(checkUser).length < 2 ){
       
        return res.status(401).json({status:false});
    }
    if(typeof checkUser.password != 'string'){
       
        return res.status(400).json({status:false});
    }
    next();
};
const register = async function(req,res,next){
    
    if(!req.body.name){
        return res.status(400).json({Message : 'name is not be empty'});
    }
    if(!req.body.surname){
        return res.status(400).json({Message : 'surname is not be empty'});
    }
    if(!req.body.age){
        return res.status(400).json({Message : 'age is not be empty'});
    }
    if(!req.body.email){
        return res.status(400).json({Message : 'email is not be empty'});
    }
    if(!req.body.password){
        return res.status(400).json({Message : 'password is not be empty'});
    }
    next();
};


const updatee = async function(req,res,next){
    if(!req.body){
        return res.status(400).json({Message : 'data is not be empty'});
    }
    if(!req.body.email){
        return res.status(400).json({Message : 'data is not be empty'});
    }
    if(!req.body.name){
        return res.status(400).json({Message : 'data is not be empty'});
    }
    next();
};

const deletee = async function(req,res,next){
    if(!req.body){
        return res.status(400).json({Message : 'data is not be empty'});
    }
    if(!req.body.delete){
        return res.status(400).json({Message : 'data is not be empty'});
    }
    
    next();
};

/*const usersList = async function(req,res){
        var useToken = req.body.token
        if(useToken == null && useToken.length < 2 ){
            return res.json(false)
        }
        else{
           let user = jwt.verify(useToken, 'asdf', function(err, decoded) { // asdf ayni olmalı 
                if(err){ //err verirse yapılacaklar 
                    return res.json("jwt expired") // süresi dolduğunu söylüyor
                }
                return decoded // şifre çözüldü 
            });
            let fulldata = await new database.CRUD("live", "user").find({ },[0,20]) //ilk parametre query ikinci parametre limit(databaseden kaç tane veri geleceğini gösteriyor)
            return res.json(fulldata)
        }
}*/

module.exports={
    login,
    register,
    updatee,
    deletee
};