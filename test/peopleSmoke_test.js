/**
 * Created by brianb on 7/10/17.
 */
var PeoplePage = require('../pages/people.page');
var LoginPage = require('../pages/login.page');
var SideBar = require('../pages/sideBar');
var Users = require('../pages/utility/users').Users.logInUser();
var userData = require('../pages/utility/userData');
var teamData = require('../pages/utility/teamInformation')
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);
var inviteUser, teamToTest, teamToCreate, siteToTest;

describe('people page smoke tests', function () {
	before(function () {
		api.post('/api/testReset/users?team=' + browser.options.testTeam + '&site='
		         + browser.options.testSite)
		   .set('Accept', 'application/json')
		   .send({})
		   .expect('Content-Type', /json/)
		   .expect(200)
		   .end(function (err, res) {
			   if (err) {
				   console.log("error = " + err + " & res = " + res)
				   throw new Error(" no response from spectrum: " + err.stack + "\n -----------");
			   } else {
				   siteToTest = res.body.site.name;
				   teamToTest = res.body.team.name;
				   inviteUser = userData.addUserData("Member", [teamToTest]);
				   teamToCreate = teamData.newTeam(
					   [userData.tu003()["username"], userData.tu004()["username"]], [siteToTest])
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();

	});
	describe('invite new user user', function () {
		before(function () {
			PeoplePage.open();
			PeoplePage.peoplePageCheck();
		})
		it('can invite a new user', function () {
			PeoplePage.inviteNewPerson([inviteUser]);
		});
		it('displays Person invited Toast Msg', function () {
			PeoplePage.invitePersonToasMsg();
		});
		it('displays the newly invited user in the user list', function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users.email, Users.password);
			LoginPage.loginWait();
			PeoplePage.open();
			PeoplePage.peoplePageCheck();
			PeoplePage.selectUserInList(inviteUser)
		});
		it('displays correct info for the newly invted user', function () {
			PeoplePage.checkUserDetails(inviteUser)
		});
	});
	describe('create new team', function () {
		it('can navigate to the teams tab of the user page',function () {
			PeoplePage.chooseTeamsTab();
		});
		it('can create a new team',function () {
			PeoplePage.createANewTeam(teamToCreate);
		});
		it('displays the team created toast msg',function () {
			PeoplePage.teamCreatedToastMsg();
		});
		it('displays the newly created team in the team list',function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users.email, Users.password);
			LoginPage.loginWait();
			PeoplePage.open();
			PeoplePage.peoplePageCheck();
			PeoplePage.chooseTeamsTab();
			PeoplePage.selectTeamInList(teamToCreate)
		});
		it('displays the correct details for the newly created team',function () {
			PeoplePage.checkTeamDetails(teamToCreate);
		});
	});
});

