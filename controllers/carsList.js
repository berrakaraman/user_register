const database = require('../models/database')



const carsAdd = async function(req,res){
    var check = await  new database.CRUD("live","user").find({"email":req.body.user_id})
    if(check){
        new database.CRUD("live","cars").insert(req.body.want)
        return res.json("added")
    }
    else{
        return res.json("didn't add")
    } 
}


const carsList =  async function(req,res){
    var carsListt = await new database.CRUD("live","cars").find({}, [0,10])
    return res.json(carsListt)
}

const carsUpdate = async function(req,res){
    if(!req.body){
        console.log(req.body)
        return res.status(400).json({Message : "data is not be empty"})
    }
    else{
        new database.CRUD("live","cars").update(
            {_id : req.body.user_id},
            {$set : {"car" : req.body.car}},
            true
        )
        return res.json("ok")
    }
} 

const carsDelete = async function(req,res){
    if(Object.keys(req.body).length == 0){
        return res.status(400).json({Message : "data must is not be empty"})
    }
    var deleteCar = await  new database.CRUD("live","cars").delete(req.body)

    if(Object.keys(deleteCar).length == 0){
        return res.json("succesful")
    }
    else{
        return res.json("failed")
    }
} 



module.exports = {
    carsAdd,
    carsList,
    carsUpdate,
    carsDelete
}