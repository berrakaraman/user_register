//All Database functions are here 
const database = require('../models/database');

const carsAdd = async function(req,res){

    var check = await  new database.CRUD('live','user').find({user_id:req.body.user_id});
    if(check){
        let car = {
            car_id: database.id(),
            user_id: req.body.user_id,
            model: req.body.model,
            plaka: req.body.plaka,
            color: req.body.color,
            years: req.body.years
        };
        new database.CRUD('live','cars').insert(car);
        return res.json('added');
    }
    else{
        return res.json('did\'t  add');
    } 
};

const carsList =  async function(req,res){
    var carsListt = await new database.CRUD('live','cars').find({}, [0,10]);
    return res.json(carsListt);
};

const carsUpdate = async function(req,res){
    var up = await new database.CRUD('live','cars').update(
        {user_id : req.body.user_id},
        {$set : {'car' : req.body.car}});
    console.log(up);
    if(up.modifiedCount == 0 ){
        return res.json('modified Count = 0');
    }
    else{
        return res.json('update is right');
    }
};
const carsDelete = async function(req,res){
    let dele = {
        car_id: req.body.car_id
    };
    console.log(dele);
    var deleteCar = await  new database.CRUD('live','cars').delete(dele);
    console.log(deleteCar);
    if(deleteCar.result != 0){
        return res.json('succesful');
    }
    else{
        return res.json('failed');
    }
}; 


module.exports = {
    carsAdd,
    carsList,
    carsUpdate,
    carsDelete
};