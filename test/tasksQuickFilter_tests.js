var Users = require('../pages/utility/users').USER_LIST;
var LoginPage = require('../pages/login.page');
var WorkPage = require('../pages/work.page');
var SideBar = require('../pages/sideBar')
var taskInformation = require('../pages/utility/taskInformation');
var phraseGen = require('../pages/utility/phraseGen');
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);
var taskEntry, user3Task, user4Task, siteToTest,teamToTest;

describe('tasks quick filter tests',function () {
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
				   throw new Error(" no responce from spectrum: " + err.stack + "\n -----------");
			   } else {
				   siteToTest = res.body.site.name;
				   teamToTest = res.body.team.name;
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users[0].email, Users[0].password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
		taskEntry = ["summary", "site", "assignee"];
		user3Task = taskInformation.addTaskData(siteToTest);
		user3Task.assignee = Users[0].userName;
		user4Task = taskInformation.addTaskData(siteToTest);
		user4Task.assignee = Users[1].userName;
		WorkPage.quickAddTask(taskEntry, user3Task);
		WorkPage.quickAddTask(taskEntry, user4Task);
	});
	describe('My Tasks Queue',function () {
		it('displays task assigned to user 3 when my task queue chosen',function () {
			WorkPage.checkMyTaskPresent(user3Task,true);
		});
		it('does not display task assigned to user 4 when my task queue chosen',function () {
			WorkPage.checkMyTaskPresent(user4Task,false);
		});
		it('does not display task assigned to user 3 when my task queue chosen',function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users[1].email, Users[1].password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.checkMyTaskPresent(user3Task,false);
		});
		it('does display task assigned to user 4 when my task queue chosen',function () {
			WorkPage.checkMyTaskPresent(user4Task,true);
		});
	});
})