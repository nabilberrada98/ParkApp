const Place = require("../models/place");
const Location = require("../models/location");
const Image = require("../models/image");
const vehSup = require("../models/vehiculesSupporte");



// uploadMedias = async (files, postId, res) => {
// 	var folder = "posts";
// 	const deta = [];
// 	const image = ["png", "jpg", "jpeg"];


// 	files.forEach(function(file) {
// 		//let fileType = file.mimetype.includes("image") ? 1 : file.mimetype.includes("video") ? 2 : 3;
// 		let name = file.originalname || file.name;
// 		let extension = name.substr((~-name.lastIndexOf(".") >>> 0) + 2);
// 		let fileType = image.includes(extension) ? 1 : extension === "mp4" ? 2 : 3;
// 		deta.push({
// 			name: file.filename,
// 			taille: "http://192.168.1.2:9000/"+ folder +"/" + file.filename,
// 			postId: postId,
// 			typeMediaId: fileType,
// 		});
// 	});
	
// 	sequelize.query(`select * from medias where postId = ${postId} `).then( ([result, metadata]) => {
// 		if(result.length >= 1){
// 			sequelize.query(`delete from medias where postId = ${postId} `);
// 			Promise
// 			.all(_.map(deta, (file) => {
// 				const { name, taille, postId } = file;
// 				return Media
// 					.create(file, {
// 					returning: true,
// 					plain: true,
// 				});
// 			}))
// 			.then(function () {
// 				res.send({ status: "success", message: "Post has been edited with success", data: deta });
// 			});
// 		}else{
// 			Promise
// 			.all(_.map(deta, (file) => {
// 				const { name, taille, postId } = file;
// 				return Media
// 					.create(file, {
// 					returning: true,
// 					plain: true,
// 				});
// 			}))
// 			.then(function () {
// 				res.send({ status: "success", message: "Post has been stored with success", data: deta });
// 			});
// 		}
// 	});


// }


module.exports = {

    index: async (req, res, next) => {
        const places = await Place.find({});
        res.status(200).json(places);
    },

    storePlace: async (req, res, next) => {
        const newPlace = new Place(req.body);
        const newVehicule = await vehSup({ libelle: req.body.vehicule });
        let images = req.body.images;
        await newVehicule.save();
        newPlace.vehicule = newVehicule



        // if(images.length >= 1){
        //     const newImages = [];
        //     images.forEach( async (image) => {
        //         if(image){
        //             const newImage = new Image({path: image});
        //             await newImage.save();
        //             newImage.place = newPlace;

        //             newImages.push(newImage);
        //         }
        //     });

        //     if(newImages.length >= 1){
        //         newPlace.images = newImages;
        //     }

        // }

        //const place = await newPlace.save();

        res.status(201).json(newPlace);
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



}