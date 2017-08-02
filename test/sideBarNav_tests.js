/**
 * Created by chrismanning on 7/11/17.
 */
var Users = require('../pages/utility/users').Users.logInUser();
var LoginPage = require('../pages/login.page');
var SideBar = require('../pages/sideBar');
var WorkPage = require('../pages/work.page');
var DashboardPage = require('../pages/dashboard.page');
var EnergyPage = require('../pages/energy.page');
var PeoplePage = require('../pages/people.page');
var SitesPage = require('../pages/sites.page');
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);

describe('Side Bar Navigation', function () {
	before(function () {
		api.post('/api/testReset/users?team=' + browser.options.testTeam + '&site='
		         + browser.options.testSite)
		   .set('Accept', 'application/json')
		   .send({})
		   .expect('Content-Type', /json/)
		   .expect(200)
		   .end(function (err, res) {
			   if (err) {
				   throw new Error(" no responce from spectrum: " + err.stack + "\n -----------");
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
	})
	it('can use side bar to nav to work page', function () {
		SideBar.navToWorkPage();
	});
	it('is on the Work page', function () {
		WorkPage.workPageCheck();
	});
	it('can use side bar to nav to energy page', function () {
		SideBar.navToEnergyPage();
	});
	it('is on energy page', function () {
		EnergyPage.energyPageCheck();
	});
	it('can use side bar to nav to people page', function () {
		SideBar.navToPeoplePage();
	});
	it('is on people page', function () {
		PeoplePage.peoplePageCheck();
	});
	it('can use the side bar to nav to the sites page', function () {
		SideBar.navToSitesPage();
	});
	it('is on the sites page', function () {
		SitesPage.sitesPageCheck();
	});
	it('can use the side bar to nav to the dashboard page', function () {
		SideBar.navToDashboardPage();
	});
	it('is on the dashboard page', function () {
		DashboardPage.dashboardPageCheck();
	});
})