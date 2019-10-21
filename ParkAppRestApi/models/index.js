const User = require("./user");
const Role = require("./role");
const Etage = require("./etage");
const Libelle = require("./libelle");
const Location = require("./location");
const Localisation = require("./localisation");
const Place = require("./place");
const Region = require("./region");
const Ville = require("./ville");
const Reservation = require("./reservation");


module.exports = { 
    User, Role, Etage, Reservation,
    Libelle, Location, Localisation, Place, Region, 
    Ville 
};
