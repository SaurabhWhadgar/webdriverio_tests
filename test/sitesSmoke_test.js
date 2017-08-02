/**
 * Created by kenziegossett on 7/17/17.
 */

var Users = require('../pages/utility/users').Users.logInUser();
var LoginPage = require('../pages/login.page');
var SitesPage = require('../pages/sites.page');
var supertest = require('supertest');
var phraseGen = require('../pages/utility/phraseGen');
var api = supertest(browser.options.baseUrl);
var locInformation = require('../pages/utility/locInformation.js');
var assetInformation = require('../pages/utility/assetInformation.js')
var siteToTest, addLocationTest, locEntry, testLoc1, element, value, newLabel;

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('sites tests', function(){
    before(function(){
        api.post('/api/testReset/users?team=' + browser.options.testTeam + '&site='
            + browser.options.testSite)
            .set('Accept', 'application/json')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("error = " + err + " & res = " + res)
                    throw new Error(" no responce from spectrum: " + err.stack + "\n -----------");
                }
                else {
                    siteToTest = res.body.site.name;
                }
            });
        LoginPage.open();
        LoginPage.loginPageCheck();
        LoginPage.logIn(Users.email, Users.password);
        LoginPage.loginWait();
        SitesPage.open();
        //addLocationTest = locInformation.addLocationData(siteToTest);
        testLoc1 = locInformation.testLoc(siteToTest);
        testAsset = assetInformation.testAsset(siteToTest);
        newLabel = phraseGen.randomLabel() + getRandomIntInclusive(1, 10);
    });
    describe('navigation tests', function() {
        it('can select site', function () {
            SitesPage.chooseSite(siteToTest);
        });
        it('can verify site', function () {
            SitesPage.inSite(siteToTest);
        });
        it('can navigate to rounds', function () {
            SitesPage.navToTabs('Rounds');
        });
        it('is on rounds tab', function () {
            SitesPage.newRoundButtonCheck();
        });
        it('can navigate to locations', function () {
            SitesPage.navToTabs('Locations');
        });
        it('is on locations tab', function () {
            SitesPage.newButtonCheck('Add Locations');
        });
        it('can navigate to assets', function () {
            SitesPage.navToTabs('Assets');
        });
        it('is on assets tab', function () {
            SitesPage.newButtonCheck('Add Assets')
        });
        it('can navigate to site settings', function () {
            SitesPage.navToTabs('Site Settings');
        });
        it('is on site settings tab', function () {
            SitesPage.checkSettings();
        });
        it('can navigate to strategies', function () {
            SitesPage.navToTabs('Strategies');
        });
        it('is on strategies tab', function () {
            SitesPage.checkStrategies();
        });
    })
    describe('site settings', function(){
        before(function(){
            SitesPage.navToTabs('Site Settings')
        })
        it('can create new asset type', function () {
            SitesPage.createNewAssetType(testAsset["type"]);
        });
        it('shows toast message of asset created', function (){
            SitesPage.createToastMsg('Type created');
        })
        it('can create new location type', function () {
            SitesPage.createNewLocationType(testLoc1["locationType"]);
        });
        it('shows toast message of type created', function(){
            SitesPage.createToastMsg('Type created');
        })
        it('can create new label', function () {
            SitesPage.createNewLabel(newLabel);
        });
        it('shows toast message of create new label', function(){
            SitesPage.createToastMsg('Label created');
        })
    })
    describe('sites locations', function() {
        // before(function(){
        //     locEntry = ["name", "locationType", "parentLocation"]
        //     value = [testLoc1["name"], testLoc1["locationType"], testLoc1["parentLocation"]]
        // })
        // it('can add location', function () {
        //     SitesPage.addLocation(locEntry, value);
        // });
    })
});