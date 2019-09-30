const Joi = require("joi")

module.exports = {

    validatePram: (schema, name) => {
        return (req, req, next) => {
            //console.log("params : ", req.params);
            const result = Joi.validate({ param: req["params"][name] }, schema);
            if(result.error){
                return result.status(400).json(result.error);
            }else{
                if(!req.value){
                    req.value = {};
                }

                if(!req.value["params"]){
                    req.value["params"] = {};
                }

                req.value["params"][name] = result.value.param;

                next();
            }
        };
    },

    schemas: {
        idSchema: Joi.object().keys({
            userId: Joi.string().regex(/^[0-9a-zA-Z]{24}$/).required()
        })
    }

};



