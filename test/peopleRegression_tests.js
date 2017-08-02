var PeoplePage = require('../pages/people.page');
var LoginPage = require('../pages/login.page');
var SideBar = require('../pages/sideBar');
var Users = require('../pages/utility/users').Users.logInUser();
var userData = require('../pages/utility/userData');
var teamData = require('../pages/utility/teamInformation')
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);
var inviteUser, teamToTest, teamToCreate, siteToTest, tu4, editInviteUser, tu4Edit, inviteUser01,
    inviteUser02, inviteUser03, inviteUser04;

describe('people regression tests', function () {
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
				   editInviteUser = userData.editUserData(inviteUser,
				                                          ["userFName", "userLName", "userEmail",
				                                           "userPhone"], "Follower",
				                                          [teamToCreate]);
				   teamToCreate = teamData.newTeam(
					   [userData.tu003()["username"], userData.tu004()["username"]], [siteToTest])
				   tu4 = userData.tu004(teamToTest, siteToTest);
				   tu4Edit = userData.editUserData(tu4, ["userFName", "userLName", "userEmail",
				                                         "userPhone", "teams"], "Follower",
				                                   [teamToCreate["teamName"]]);
				   inviteUser01 = userData.addUserData("Member", [teamToTest]);
				   inviteUser02 = userData.addUserData("Member", [teamToTest]);
				   inviteUser03 = userData.addUserData("Member", [teamToTest]);
				   inviteUser04 = userData.addUserData("Member", [teamToTest]);
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		PeoplePage.open();
		PeoplePage.peoplePageCheck();
	});
	describe('edit a user', function () {
		before(function () {
			PeoplePage.createANewTeam(teamToCreate);
			PeoplePage.selectUserInList(tu4);
		});
		describe('add user to team', function () {
			before(function () {
				tu4.teams = [teamToTest, teamToCreate["teamName"]];
			})
			it('can add a user to a team(s)', function () {
				PeoplePage.addUserToTeam(tu4)
			});
			it('displays the added team in the users details', function () {
				SideBar.useUserMenu('Sign Out');
				LoginPage.logIn(Users.email, Users.password);
				LoginPage.loginWait();
				PeoplePage.open();
				PeoplePage.peoplePageCheck();
				PeoplePage.selectUserInList(tu4);
				PeoplePage.checkUserDetails(tu4);
			});
		});
		describe('remove user from a team', function () {
			before(function () {
				tu4.teams = [teamToCreate["teamName"]];
				SideBar.useUserMenu('Sign Out');
				LoginPage.logIn(Users.email, Users.password);
				LoginPage.loginWait();
				PeoplePage.open();
				PeoplePage.peoplePageCheck();
				PeoplePage.selectUserInList(tu4);
			});
			it('can remove a user from a team', function () {
				PeoplePage.removeUserFromTeam([teamToTest]);
			});
			it('displays only teams that have not been removed from user', function () {
				SideBar.useUserMenu('Sign Out');
				LoginPage.logIn(Users.email, Users.password);
				LoginPage.loginWait();
				PeoplePage.open();
				PeoplePage.peoplePageCheck();
				PeoplePage.selectUserInList(tu4);
				PeoplePage.checkUserDetails(tu4);
			});
		});
		describe('edit details', function () {
			describe('edit pending user', function () {
				before(function () {
					SideBar.useUserMenu('Sign Out');
					LoginPage.logIn(Users.email, Users.password);
					LoginPage.loginWait();
					PeoplePage.open();
					PeoplePage.peoplePageCheck();
					PeoplePage.inviteNewPerson([inviteUser]);
					PeoplePage.selectUserInList(inviteUser);
				})
				it('can edit a users details', function () {
					PeoplePage.editUserDetails(inviteUser, editInviteUser,
					                           ["userFName", "userLName", "userEmail", "userPhone"])
				});
				it('displays the edited details', function () {
					SideBar.useUserMenu('Sign Out');
					LoginPage.logIn(Users.email, Users.password);
					LoginPage.loginWait();
					PeoplePage.open();
					PeoplePage.peoplePageCheck();
					PeoplePage.selectUserInList(editInviteUser);
					PeoplePage.checkUserDetails(editInviteUser);
				});
			});
			describe('edit existing user', function () {
				before(function () {
					SideBar.useUserMenu('Sign Out');
					LoginPage.logIn(Users.email, Users.password);
					LoginPage.loginWait();
					PeoplePage.open();
					PeoplePage.peoplePageCheck();
					PeoplePage.selectUserInList(tu4);
				})
				it('can edit a users details', function () {
					PeoplePage.editUserDetails(tu4, tu4Edit, ["userFName", "userLName", "userEmail",
					                                          "userPhone"]);
				});
				it('displays the edited details', function () {
					SideBar.useUserMenu('Sign Out');
					LoginPage.logIn(Users.email, Users.password);
					LoginPage.loginWait();
					PeoplePage.open();
					PeoplePage.peoplePageCheck();
					PeoplePage.selectUserInList(tu4Edit);
					PeoplePage.checkUserDetails(tu4Edit);
				});
			});
		});
	});
	describe('invite multiple users', function () {
		before(function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users.email, Users.password);
			LoginPage.loginWait();
			PeoplePage.open();
			PeoplePage.peoplePageCheck();
		});
		it('can invite multiple users at once', function () {
			PeoplePage.inviteNewPerson([inviteUser01, inviteUser02, inviteUser03, inviteUser04]);
		});
		it('displays Person invited Toast Msg', function () {
			PeoplePage.inviteMultiplePeopleToastMsg(4);
		});
	});
});