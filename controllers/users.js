const database = require('../models/database')
const response = require('../helpers/response')
var jwt = require('jsonwebtoken');
const { access } = require('fs');

const login =  async function(req,res){
    let checkUser = req.body;

    if(Object.keys(checkUser).length < 2 ){
       
        return res.status(401).json({status:false})
    }
    if(typeof checkUser.password != "string"){
       
        return res.status(400).json({status:false})
    }
    
    var check = await new database.CRUD("live","user").find({
        $and :[
            {"email": checkUser.email},
            {"password" : checkUser.password}
        ]
    },
    [
        0,1
    ],
    {
        password:false
    })

    if(check.length == 0 ){
        return res.status(400).json({status:false})
    }
    else{
        /*const user ={
            "name" : req.body.name,
            "email" : req.body.email
        } */

        const token = jwt.sign(check[0], "asdf", {expiresIn: '10m'} );
        //res.json(token);
        return res.status(200).json(response.TRUE(check,token))

    }
}
const register = async function(req,res){
    const newPeople = req.body
    var model = req.body;
    if(model.email  && model.age && model.password && model.name && model.surname ){
        var check = await new database.CRUD("live","user").find({
            $and :[
                {"name": model.name},
                {"surname": model.surname},
                {"age": model.age},
                {"email": model.email},
                {"password" : model.password}
            ]
        })
        
        if(check.length > 0){
            return res.status(409).json({staus:false})
        }  
        else{
            new database.CRUD("live","user").insert(newPeople)
            return res.json(newPeople)
        }
    }
    return res.status(404).json({status:false})

}

const usersList =  async function(req,res){
        var fulldata = await  new database.CRUD("live", "user").find({ },[0,5]) //ilk parametre query ikinci parametre limit(databaseden kaç tane veri geleceğini gösteriyor)
        return res.json(fulldata)
}

const admin = async function(req,res){
        const newPeople = req.body
        new database.CRUD("live","user").insert(newPeople)
        return res.json("ok")
}
const updatee = async function(req,res){
    if(!req.body){
        return res.status(400).json({Message : "data is not be empty"})
    }
    var updates = await  new database.CRUD("live", "user").update(
        {email: req.body.email},
        {$set: {"name": req.body.name}},
        true
    )

    console.log(updates)
    if(!updates){
        return res.json("user not update")
    }
    else{
        return res.json("user update")
    }
}

const deletee = async function(req,res){
    if(!req.body){
        return res.status(400).json({Message : "data is not be empty"})
    }
    var deletes = await  new database.CRUD("live", "user").delete(req.body)
    
    if(!deletes){
        return res.json("user not delete")
    }
    else{
        return res.json("user deleted")
    }
}

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
    usersList,
    admin,
    updatee,
    deletee
}