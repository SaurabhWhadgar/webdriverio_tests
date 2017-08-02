var Users = require('../pages/utility/users').Users.logInUser();
var LoginPage = require('../pages/login.page');
var WorkPage = require('../pages/work.page');
var SideBar = require('../pages/sideBar')
var taskInformation = require('../pages/utility/taskInformation');
var phraseGen = require('../pages/utility/phraseGen');
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);
var taskEntry, addTaskTest, siteToTest, blockTaskTest, reason, cancelTaskTest, anotherReason;

describe('tasks block & cancel tests', function () {
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
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
	});
	describe('cancel task tests', function () {
		before(function () {
			taskEntry = ["summary", "site"];
			addTaskTest = taskInformation.addTaskData(siteToTest);
			cancelTaskTest = taskInformation.editTaskValues([""], "canceled", addTaskTest);
			WorkPage.quickAddTask(taskEntry, addTaskTest);
			WorkPage.checkTaskPresent(addTaskTest, true);
			reason = phraseGen.randomPhrase();
			anotherReason = phraseGen.randomPhrase();
		});
		it('can cancel a task from the work page', function () {
			WorkPage.cancelTask(reason);
		});
		it('does not display a canceled task in the open task queue', function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users.email, Users.password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.checkTaskPresent(cancelTaskTest, false);
		});
		it('does display closed task in the closed task queue', function () {
			WorkPage.chooseTaskQueue('CLOSED');
			WorkPage.checkTaskPresent(cancelTaskTest, true);
		});
		it('displays in task details that task is canceled and the correct reason', function () {
			WorkPage.blockCancelDetail(cancelTaskTest, [reason, 'Task Canceled']);
		});
		it('can edit a canceled tasks  reason', function () {
			WorkPage.cancelTask(anotherReason,true);
		});
		it('displays in task details that task is canceled and the edited reason', function () {
			WorkPage.blockCancelDetail(cancelTaskTest, [anotherReason, 'Task Canceled']);
		});
		it('can reopen a canceled task', function () {
			WorkPage.reopenTask();
		});
		it('does display a reopened task in the open task queue', function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users.email, Users.password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.checkTaskPresent(cancelTaskTest, true);
		});
		it('does not display reopened task in the closed task queue', function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users.email, Users.password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.chooseTaskQueue('CLOSED');
			WorkPage.checkTaskPresent(cancelTaskTest, false);
		});
	});
	describe('block task tests', function () {
		describe('Block Reason = Other',function () {
			before(function () {
				blockTaskTest = taskInformation.editTaskValues([""], "blocked", cancelTaskTest);
				WorkPage.chooseTaskQueue();
				WorkPage.checkTaskPresent(blockTaskTest, true);
				reason = phraseGen.randomPhrase();
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask('Other',reason);
			});
			it('does not display blocked task in the closed queue',function () {
				SideBar.useUserMenu('Sign Out');
				LoginPage.logIn(Users.email, Users.password);
				LoginPage.loginWait();
				WorkPage.open();
				WorkPage.workPageCheck();
				WorkPage.chooseTaskQueue('CLOSED');
				WorkPage.checkTaskPresent(blockTaskTest, false);
			});
			it('displays blocked task in the open queue',function () {
				SideBar.useUserMenu('Sign Out');
				LoginPage.logIn(Users.email, Users.password);
				LoginPage.loginWait();
				WorkPage.open();
				WorkPage.workPageCheck();
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Cannot Stop Equipment',function () {
			before(function () {
				reason = 'Cannot Stop Equipment';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Down for Repair',function () {
			before(function () {
				reason = 'Down for Repair';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Equipment Not Running',function () {
			before(function () {
				reason = 'Equipment Not Running';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Improper Materials',function () {
			before(function () {
				reason = 'Improper Materials';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Improper Tools',function () {
			before(function () {
				reason = 'Improper Tools';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Not Enough Time',function () {
			before(function () {
				reason = 'Not Enough Time';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Unable to Find',function () {
			before(function () {
				reason = 'Unable to Find';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Waived - Not Necessary',function () {
			before(function () {
				reason = 'Waived - Not Necessary';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
			it('can unblock a task',function () {
				WorkPage.unblockTask();
			});
			it('does not display blocked task flag for task in queue that was unblocked',function () {
				WorkPage.taskInQueueBlocked(true)
			});
		});
		describe('Block Reason = Waived - Wrong Action',function () {
			before(function () {
				reason = 'Waived - Wrong Action';
			});
			it('can block a task from the work page', function () {
				WorkPage.blockTask(reason);
			});
			it('displays blocked task in the open queue',function () {
				WorkPage.checkTaskPresent(blockTaskTest, true);
			});
			it('displays the correct flag for blocked task in queue',function () {
				WorkPage.taskInQueueBlocked();
			});
			it('displays in task details that task is blocked and the correct reason', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [reason, 'Task Blocked']);
			});
		});
		describe('edit blocked task',function () {
			before(function () {
				anotherReason = 'Unable to Find';
			});
			it('can edit a blocked tasks reason for blocking', function () {
				WorkPage.blockTask(anotherReason,'',true);
			});
			it('displays the edited reason for blocking', function () {
				WorkPage.blockCancelDetail(blockTaskTest, [anotherReason, 'Task Blocked']);
			});
		})
	});
});