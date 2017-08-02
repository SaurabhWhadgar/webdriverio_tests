/**
 * Created by kenziegossett on 7/24/17.
 */
var assetInformation = function(){
};

var phraseGen = require('./phraseGen');
// var spectrum_tasks_page = require('../pages/spectrum_tasks_page.js').spectrum_tasks_page;

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function assetData(name, type, description, status,notes,serialNumber,vendor,vendorContactName,
                   vendorContactPhone,purchasePrice,lifespan,warrantyContactName,
                   warrantyContactPhone,purchaseDate,purchaseDateDisplay,warrantyExpirationDate,
                   warrantyExpirationDateDisplay,Manufacturer,Model,location,reading){
    this.name = name;
    this.type = type;
    this.description = description;
    this.status = status;
    this.notes = notes;
    this.serialNumber = serialNumber;
    this.vendor = vendor;
    this.vendorContactName = vendorContactName;
    this.vendorContactPhone = vendorContactPhone;
    this.purchasePrice = purchasePrice;
    this.lifespan = lifespan;
    this.warrantyContactName = warrantyContactName;
    this.warrantyContactPhone = warrantyContactPhone;
    this.purchaseDate = purchaseDate;
    this.purchaseDateDisplay = purchaseDateDisplay;
    this.warrantyExpirationDate = warrantyExpirationDate;
    this.warrantyExpirationDateDisplay = warrantyExpirationDateDisplay;
    this.Manufacturer = Manufacturer;
    this.Model = Model;
    this.location = location;
    this.reading = reading;
};

function cloneAsset(obj){
    return new assetData(obj["name"],obj["type"],obj["description"],obj["status"],obj["notes"],
        obj["serialNumber"],obj["vendor"],obj["vendorContactName"],obj["vendorContactPhone"],
        obj["purchasePrice"],obj["lifespan"],obj["warrantyContactName"],obj["warrantyContactPhone"],
        obj["purchaseDate"],obj["purchaseDateDisplay"],obj["warrantyExpirationDate"],
        obj["warrantyExpirationDateDisplay"],obj["Manufacturer"],obj["Model"],obj["location"],
        obj["reading"])
};

module.exports = {
    addLocationData(site){
        var addLocation = new locationData(name, locationType, parentLocation);
        return addLocation;
    },
    testAsset(status, loc){
        var asset = new assetData(
            phraseGen.randomLabel()+getRandomIntInclusive(1,10),
            phraseGen.randomLabel()+getRandomIntInclusive(1,10),
            phraseGen.randomPhrase(),
            // status,
            // phraseGen.randomPhrase(),
            // phraseGen.randomInt(15),
            // phraseGen.randomPhrase(),
            // phraseGen.randomName(),
            // "214"+phraseGen.randomInt(7),
            // phraseGen.randomInt(6),
            // phraseGen.randomInt(3),
            // phraseGen.randomName(),
            // "214"+phraseGen.randomInt(7),
            // days,
           // spectrum_tasks_page.commentDate(days, false),
           // days2,
           // spectrum_tasks_page.commentDate(days2, false),
           //  phraseGen.randomLabel()+getRandomIntInclusive(1,10),
           //  phraseGen.randomLabel()+getRandomIntInclusive(1,10),
           //  loc,
            [phraseGen.randomLabel()+getRandomIntInclusive(1,10),"Value","0-10"]
        )
        return asset;
    }

};