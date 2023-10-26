const validator = require('../helpers/validate');

const saveUser = (req, res, next) =>{
    const validationRule = {
        fname: 'required|min:2',
        lname: 'required|string|min:2',
        height: 'required|string',
        membershipStatus: 'string',
        cardNum: 'required|min:16',
    };
    validator(req.body, validationRule, {}, (err, status) =>{
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};



module.exports = {
    saveUser,

}