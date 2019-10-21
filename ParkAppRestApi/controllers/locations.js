const Location = require("../models/location");
const config = require("../config/config");
module.exports = {


    // uploadMedias: async (files) => {
        
    //     return savedImages;
    // },

    store: async (req, res, next) => {
        // try {
            console.log('heere');
            //console.log(req.body);
            // console.log(req.body);
            var folder = "places";
            const parsedData =JSON.parse(req.body.data);
            const parsedFiles =req.body.files;
            console.log(parsedFiles);
            //console.log(parsedData);
            const images=[];
            parsedFiles.forEach(function(file) {
                // let name = file.originalname || file.name;
                // let extension = name.substr((~-name.lastIndexOf(".") >>> 0) + 2);
                images.push(config.host + ":" + config.port + "/" + folder +"/" + file.filename);
            });
            let userId = Number(req.user._id);
            parsedData.place.images=images;
            // console.log(req.body);
            // const newLoc = new Location();
            const loc = await Location.create({ ...parsedData, locataire : userId})
            res.status(201).send("loc");
        // }catch(e){
        //     console.log(e);
        //     req.files.forEach(function(file){
        //         unlinkAsync(__basedir + '/resources/static/assets/uploads/places/' + file.filename);
        //     });
        //     res.status(406).send("Upload failed");
        // }
    },

    index: async (req, res, next) => {
        const locationlist = await Location.find({}).populate('place').exec();
        //locationlist.populate('place').exec();
        res.status(200).json(locationlist);
    },

    getById: async (req, res, next) => {
        const { locId } = req.params;
        const loc = await Location.findById(locId);
        res.status(200).send(loc);
    },

    edit: async (req, res, next) => {
        const { locId } = req.params;
        const user = await Location.findByIdAndUpdate(locId, req.body, { message: "user has been edited successfully !!"});
        res.status(200).send(user);  
    },

    destory: async (req, res, next) => {
        const { locId } = req.params;
        await Location.findByIdAndDelete(locId);
        res.status(200).send({message: "the Location, has been deleted successfully"});
    }

}