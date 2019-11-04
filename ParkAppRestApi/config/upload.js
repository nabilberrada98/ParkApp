const multer = require('multer');
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
var url  = require('url');

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
}
  
// generateId :: Integer -> String
function generateId () {
    //var arr = new Uint8Array((len || 40) / 2)
    var arr = crypto.randomBytes(10).toJSON().data
    return Array.from(arr, dec2hex).join('')
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const token = jwt.decode(req.headers["x-access-token"], 8);
    if(token){
        let path = url.parse(req.url).pathname === "/api/locations";

        cb(null, __basedir + '/resources/static/assets/uploads/places');

    }
    
  },
  filename: (req, file, cb) => {
    const token = jwt.decode(req.headers["x-access-token"], 8);
    let userId = Number(token.id);
    let name = file.originalname || file.name;
    let extension = name.substr((~-name.lastIndexOf(".") >>> 0) + 2);
    let filename = generateId() +"."+ extension;
    cb(null, filename)
  },


});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

module.exports = upload;