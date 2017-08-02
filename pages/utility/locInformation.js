/**
 * Created by kenziegossett on 7/19/17.
 */

var phraseGen = require('./phraseGen');

//var name = phraseGen.randomLocation();
var name, locationType, parentLocation, quantity, loc;

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function locationData(name, locationType, parentLocation, quantity){
    this.name = name;
    this.locationType = locationType;
    this.parentLocation = parentLocation;
    this.quantity = quantity;
}

function cloneLocationData(obj) {
    return new locationData(obj["name"], obj["locationType"], obj["parentLocation"]);
}

module.exports = {
    addLocationData(site){
        var addLocation = new locationData(name, locationType, parentLocation);
        return addLocation;
    },
    testLoc(loc){
    var data = new locationData(
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        phraseGen.randomLabel()+getRandomIntInclusive(1,10),
        phraseGen.randomPhrase(),
        loc
    )
    data.reading = [phraseGen.randomLabel()+getRandomIntInclusive(1,10),"Value","0-10"];
    return data
    }

};
