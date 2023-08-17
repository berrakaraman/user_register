// There is no Database here

const carsAdd = async function(req,res, next){
    let myBody = {};
    if(!req.body.user_id) {
        return res.status(404).json({status: false});
    }
    if(!req.body.model){
        return res.status(404).json({status: false});
    }
    if(!req.body.plaka){
        return res.status(404).json({status: false});
    }
    if(!req.body.color){
        return res.status(404).json({status: false});
    }
    if(!req.body.years){
        return res.status(404).json({status: false});
    }

    myBody.user_id = req.body.user_id.toString();
    myBody.model = req.body.model.toString();
    myBody.plaka = req.body.plaka.toString();
    myBody.color = req.body.color.toString();
    myBody.years = parseInt(req.body.years);

    req.body = myBody;
    next();
};

const carsUpdate = async function(req,res,next){
    if(!req.body){
        return res.status(400).json({Message : 'data must is not be empty'});
    }
    if(!req.body.user_id){
        return res.status(400).json({Message : 'data must is not be empty'});
    }
    if(!req.body.car){
        return res.status(400).json({Message : 'data must is not be empty'});
    }
    next();
}; 

const carsDelete = async function(req,res,next){
    if(!req.body.car_id){
        return res.status(400).json({Message : 'delete must is not be empty'});
    }
    next();
}; 

module.exports = {
    carsAdd,
    carsUpdate,
    carsDelete
};