const Location = require("../models/location");
const Place = require("../models/place");
const Localisation = require("../models/localisation");
const config = require("../config/config");
const ObjectId = require("mongoose").ObjectId;

module.exports = {


    // uploadMedias: async (files) => {
        
    //     return savedImages;
    // },

    store: async (req, res, next) => {
        // try {
            console.log('======================================================');

            console.log(req.body);

            var folder = "places";
            const parsedFiles = req.files;
            const images=[];
            parsedFiles.forEach(function(file) {
                images.push(config.host + ":" + config.port + "/" + folder +"/" + file.filename);
            });

            console.log(images);

            let userId = req.user._id;
            let parsedData = JSON.parse(req.body.content);
            let place = parsedData.place;
            let placeLoc = parsedData.place.localisation;
            placeLoc.ville = null;
            parsedData.place.images = images;

            const loc = await Localisation.create({ ...placeLoc });
            parsedData.place.localisation = loc._id;
            const p = await Place.create({ ...place });
            parsedData.place = p._id;
            const location = await Location.create({ ...parsedData , locataire: userId });

            res.status(201).send(location);
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