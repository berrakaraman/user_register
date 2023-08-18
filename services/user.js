// All Database functions are here 

const database = require('../models/database');
const response = require('../helpers/response');
var jwt = require('jsonwebtoken');

const login =  async function(req,res){
    let checkUser = req.body;
    var check = await new database.CRUD('live','user').find({
        $and :[
            {'email': checkUser.email},
            {'password' : checkUser.password}
        ]
    },
    [
        0,1
    ],
    {
        password:false
    });

    if(check.length == 0 ){
        return res.status(400).json({status:false});
    }
    else{
        const token = jwt.sign(check[0], 'asdf', {expiresIn: '60m'} );
        //res.json(token);
        return res.status(200).json(response.TRUE(check,token));

    }
};
const register = async function(req,res){
    const newPeople = {
        user_id: database.id(),
        name : req.body.name,
        surname: req.body.surname,
        age:req.body.age,
        email:req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    var model = req.body;
    if(model.email  && model.age && model.password && model.name && model.surname ){
        var check = await new database.CRUD('live','user').find({
            $and :[
                {'name': model.name},
                {'surname': model.surname},
                {'age': model.age},
                {'email': model.email},
                {'password' : model.password},
                {'role': model.role}
            ]
        });
        
        if(check.length > 0){
            return res.status(409).json({staus:false});
        }  
        else{
            new database.CRUD('live','user').insert(newPeople);
            return res.json(newPeople);
        }
    }
    return res.status(404).json({status:false});

};
const usersList =  async function(req,res){
    var fulldata = await  new database.CRUD('live', 'user').find({ },[0,5]); //ilk parametre query ikinci parametre limit(databaseden kaç tane veri geleceğini gösteriyor)
    return res.json(fulldata);
};
const admin = async function(req,res){
    const newPeople = req.body;
    new database.CRUD('live','user').insert(newPeople);
    return res.json('ok');
};
const updatee = async function(req,res){
    var updates = await  new database.CRUD('live', 'user').update(
        {email: req.body.email},
        {$set: {'name': req.body.name}}
    );
    console.log(updates);
    if(updates.modifiedCount == 0 ){
        return res.json('modified Count = 0');
    }
    else{
        return res.json('user update');
    }
};
const deletee = async function(req,res){
    var deletes = await  new database.CRUD('live', 'user').delete(req.body);
    console.log(deletes);
    if(deletes.result == 0){
        return res.json('user not delete');
    }
    else{
        return res.json('user deleted');
    }
};




module.exports={
    login,
    register,
    usersList,
    admin,
    updatee,
    deletee
};