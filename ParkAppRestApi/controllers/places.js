const Place = require("../models/place");
const Location = require("../models/location");
const Image = require("../models/image");
const vehSup = require("../models/vehiculesSupporte");
const config = require("../config/config");
const Ville = require("../models/ville");


uploadMedias = async (files, placeId) => {
	var folder = "places";
    const savedImages=[];
	files.forEach(function(file) {
		let name = file.originalname || file.name;
		let extension = name.substr((~-name.lastIndexOf(".") >>> 0) + 2);
		savedImages.push(Image.save({
			path: config.host + ":" + config.port + "/" + folder +"/" + file.filename,
			place : placeId
		}));
    });
    
    return savedImages;

}


module.exports = {

    index: async (req, res, next) => {
        const places = await Place.find({});
        res.status(200).json(places);
    },

    storePlace: async (req, res, next) => {

        try{
            const newPlace = new Place({...req.body, user: req.user.id}); 
            await uploadMedias(req.files, newPlace._id)
            const place = await newPlace.save();
            res.status(201).json(place);
        }catch(e){
            req.files.forEach(function(file){
                unlinkAsync(__basedir + '/resources/static/assets/uploads/places/' + file.filename);
            })
        }

        res.status(404).send(test);
    },

    getPlace: async (req, res, next) => {
        const { placeId } = req.params;
        const place = await Place.findById(placeId);
        res.status(200).json(place);
    },

    editPlace: async (req, res, next) => {
        const { placeId } = req.params;
        const place = await Place.findByIdAndUpdate(placeId, req.body, {"message": "user has been edited successfully !!"});
        res.status(200).json(place);
    },

    deletePlace: async (req, res, next) => {
        const { placeId } = req.params;
        const place = await User.findOneAndDelete(placeId);
        res.status(200).json(place);
    },

    getAllCities: async (req, res, next) => {
        const cities = await Ville.find({});
        res.status(200).json(cities);
    },

    getRangePrices: async (req, res, next) => {
        const arr = await Location.aggregate([{ 
            "$group": { 
                "_id": null, 
                "max": { "$max": "$price" },  
                "min": { "$min": "$price" }
            } 
        }]);

        res.status(200).json(arr);
    },

    fillterPlaces: async (req, res, next) => {
        const { ville, prix, dateStart, dateEnd } = req.body;
        
        const places = await Locations.find({
            
        }).populate({ 
            path: 'place',
            populate: {
              path: 'parking',
              model: 'parking'
            } 
        }).exec();
    
    }


}