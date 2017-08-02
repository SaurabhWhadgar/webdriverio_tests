/**
 * Created by chrismanning on 7/11/17.
 */
var Page = require('./page');
var SideBar = require('./sideBar');
var DatePicker = require('./datePicker');

class WorkPage extends Page {

	open() {
		super.open('tasks');
	}

	get workPageMain() {
		return super.mainTab('Work');
	}

	workPageCheck() {
		browser.element("//" + this.workPageMain).waitForVisible(super.globalWait())
	}

	/**
	 * task queue
	 */
	taskListNav(tab) {
		return browser.element("//a[.='" + tab + "'][(ancestor::li[@class='page-nav-list-item'])]");
	}

	chooseAllTasks() {
		this.taskListNav('All Tasks').waitForVisible(super.globalWait())
		this.taskListNav('All Tasks').click();
	}

	chooseMyTasks() {
		this.taskListNav('My Tasks').waitForVisible(super.globalWait())
		this.taskListNav('My Tasks').click();
	}

	taskQueue(tab) {
		return browser.element("//div[contains(@class,'taskqueue')][contains(@class,'is-active')]"
		                       + "[//span[.='" + tab + "']]")
	}

	taskInQueue(summary) {
		return browser.element("//div[contains(text(),'" + summary
		                       + "')][(ancestor::div[@class='taskqueue-tasklist'])]")
	}

	taskInQueueBlocked(boolean) {
		boolean = boolean || false
		return browser.element("//div[contains(@class,'taskitem')][contains(@class,'is-selected')]"
		                       + "[.//i[contains(@class,'alert-octagon')]]")
		              .waitForVisible(super.globalWait(), boolean)
	}

	taskInQueueStatus(obj) {
		return browser.element("//div[contains(@class,'taskitem')][contains(@class,'is-selected')]"
		                       + "[.//*[contains(text(),'" + obj["taskStatus"] + "')]]")
		              .waitForVisible(super.globalWait())
	}

	moreTasksButton() {
		return browser.element("//button[.='More Tasks']");
	}

	taskQueueToggle(value) {
		return browser.element("//span[contains(text(),'" + value
		                       + "')][(ancestor::div[@class='taskqueue-togglegroup'])]")
	}

	clickMoreTasks(obj, expected) {
		if (this.moreTasksButton().isVisible() === true) {
			this.moreTasksButton().click();
			this.checkForTaskInQueue(obj, expected)
		} else {
			if (expected === true) {
				throw new Error("Task with summary = " + obj["summary"] + " not found: ");
			} else {
				this.taskInQueue(obj["summary"]).isVisible().should.be.equal(expected)
			}
		}
	}

	checkForTaskInQueue(obj, expected) {
		browser.pause(2000)
		if (this.taskInQueue(obj["summary"]).isVisible() != true) {
			this.clickMoreTasks(obj, expected)
		}
	}

	chooseTaskQueue(queue) {
		queue = queue || "OPEN";
		this.taskQueueToggle(queue).waitForVisible(super.globalWait());
		this.taskQueueToggle(queue).click();
	}

	checkTaskPresent(obj, expected) {
		if (SideBar.sideBarOpen.isVisible() === true) {
			SideBar.chevron.click()
		}
		this.chooseAllTasks();
		this.checkForTaskInQueue(obj, expected);
		if (expected === true) {
			this.taskInQueue(obj["summary"]).click();
		}
	}

	checkMyTaskPresent(obj, expected) {
		if (SideBar.sideBarOpen.isVisible() === true) {
			SideBar.chevron.click()
		}
		this.chooseMyTasks();
		this.checkForTaskInQueue(obj, expected);
		if (expected === true) {
			this.taskInQueue(obj["summary"]).click();
		}
	}

	/**
	 * task details
	 */
	get taskDetailsMain() {
		return "div[contains(@class,'taskdetails')][contains(@class,'is-active')]"
	}

	taskDetailsFields(detail) {
		return browser.element("//*[contains(text(),'" + detail + "')][(ancestor::"
		                       + this.taskDetailsMain + ")]")
	}

	taskLabelFields(detail) {
		return browser.element("//span[@class='Select-item-label'][contains(text(),'" + detail
		                       + "')]")
	}

	checkTaskDetails(taskEntry, obj) {
		for (var count = 0; count < taskEntry.length; count++) {
			if (taskEntry[count] != 'labels' && taskEntry[count] != 'addedDays' && taskEntry[count]
			                                                                       != 'now'
			    && taskEntry[count] != 'today' && taskEntry[count] != 'tomorrow') {
				super.checkForElement(
					this.taskDetailsFields(obj[taskEntry[count]]), taskEntry[count] + ' detail = '
					                                               + obj[taskEntry[count]])
			} else if (taskEntry[count] === 'labels') {
				for (var count1 = 0; count1 < obj["labels"].length; count1++) {
					browser.pause(1000);
					super.checkForElement(this.taskLabelFields(obj["labels"][count1]), 'task'
					                                                                     + ' label = '
					                                                                     + obj["labels"][count1])
				}
			} else if (taskEntry[count] === 'addedDays' || taskEntry[count] === 'now'
			           || taskEntry[count] === 'today' || taskEntry[count] === 'tomorrow') {
				browser.getAttribute("//input[@placeholder='Due']", 'value').should.be.equal(
					obj["displayDate"])
			}
		}
	}

	editTaskFields(type) {
		return browser.element("//textarea[contains(@class,'formcontrol-textarea-input')][@name='"
		                       + type + "'][(ancestor::" + this.taskDetailsMain + ")]");
	}

	editTaskSelect(type) {
		return browser.element("//div[contains(@class,'formcontrol-inpputwrap')][p[.='" + type
		                       + "']][(ancestor::" + this.taskDetailsMain + ")]")
	}

	clearDueDate() {
		return browser.element("//i[contains(@class,'mdi-close')][(ancestor::"
		                       + this.taskDetailsMain + ")]")
	}

	taskDetailDueField() {
		return browser.element("//input[@placeholder='Due'][(ancestor::" + this.taskDetailsMain
		                       + ")]")
	}

	taskDetailLabelRemove() {
		return browser.element(
			"//span[contains(text(),'×')][(ancestor::div[contains(@class,'mod-labels')])]")
	}

	removeTaskDetailsLabels(eObj) {
		for (var count = 0; count < eObj["labels"].length; count++) {
			this.taskDetailLabelRemove().click()
		}
	}

	editTaskElements() {
		return {
			summary: this.editTaskFields('name'), description: this.editTaskFields('description'),
			location: this.editTaskSelect('Location/Asset'),
			assignee: this.editTaskSelect('Assignee')
		}
	}

	editATask(taskEdit, eObj) {
		for (var count = 0; count < taskEdit.length; count++) {
			if (taskEdit[count] === 'summary' || taskEdit[count] === 'description') {
				super.clickClearSet(this.editTaskElements()[taskEdit[count]], eObj[taskEdit[count]])
			} else if (taskEdit[count] === 'location' || taskEdit[count] === 'assignee') {
				super.useSelectMenu(this.editTaskElements()[taskEdit[count]], eObj[taskEdit[count]])
			} else if (taskEdit[count] === 'addedDays') {
				this.clearDueDate().click();
				this.taskDetailDueField().waitForVisible(super.globalWait())
				this.taskDetailDueField().click()
				DatePicker.useDatePicker(eObj[taskEdit[count]])
			} else if (taskEdit[count] === 'labels') {
				this.removeTaskDetailsLabels(eObj)
				super.dynamicSendKeysLoop(
					this.useAddTaskForm(this.taskDetailsMain)[taskEdit[count]],
					eObj[taskEdit[count]])
			}
		}
	}

	changeTaskStatus(status) {
		browser.element("//div[contains(@class,'mod-reactselect')][input[@type='hidden']][(ancestor::"
		                + this.taskDetailsMain + ")]").click();
		browser.element("//*[contains(text(),'" + status + "')][(ancestor::" + this.taskDetailsMain
		                + ")]").click()
	}

	blockOrCancelTaskMenu() {
		return browser.element("//div[@class='taskdetails-options'][(ancestor::"
		                       + this.taskDetailsMain + ")]");
	}

	blockOrCancelOption(option) {
		return browser.element("//*[contains(text(),'" + option + "')][(ancestor::"
		                       + this.taskDetailsMain + ")]")
	}

	cancelTaskModalMain() {
		return super.modal("Cancel Task")
	}

	blockTaskModalMain() {
		return super.modal("Block Task");
	}

	cancelTask(reason, edit) {
		edit = edit || false
		if (edit === true) {
			this.editBlockCancelTask().click();
		} else {
			this.blockOrCancelTaskMenu().click();
			this.blockOrCancelOption('Cancel Task').click();
		}
		super.clickClearSet(
			browser.element("//textarea[@label='Reason'][(ancestor::" + this.cancelTaskModalMain()
			                + ")]"), reason);
		browser.element("//span[.='Cancel Task'][(ancestor::" + this.cancelTaskModalMain() + ")]")
		       .click();
	}

	blockTask(type, reason, edit) {
		edit = edit || false
		if (edit === true) {
			this.editBlockCancelTask().click();
		} else {
			this.blockOrCancelTaskMenu().click();
			this.blockOrCancelOption('Block Task').click();
		}
		super.useSelectMenu(
			browser.element("//div[contains(@class,'mod-reactselect')][//*[.='Reason for"
			                + " Blocking']][(ancestor::" + this.blockTaskModalMain() + ")]"), type);
		if (type === 'Other') {
			super.clickClearSet(browser.element("//input[@label='New Reason'][(ancestor::"
			                                    + this.blockTaskModalMain() + ")]"), reason);
		}
		browser.element("//span[.='Block Task'][(ancestor::" + this.blockTaskModalMain() + ")]")
		       .click();
	}

	blockCancelDetailMain() {
		return "div[contains(@class,'taskdetails')][div[contains(@class,'alert')]]"
	}

	editBlockCancelTask() {
		return browser.element("//a[.='Edit'][(ancestor::" + this.blockCancelDetailMain() + ")]")
	}

	blockCancelDetail(obj, detail) {
		for (var count = 0; count < detail.length; count++) {
			if (browser.element("//*[contains(text(),'" + detail[count] + "')][(ancestor::"
			                    + this.blockCancelDetailMain() + ")]")
			           .isVisible() != true) {
				throw new Error("Task with summary = " + obj["summary"] + " did not have "
				                + detail[count] + " block/cancel detail");
			}
		}
	}

	reopenTask() {
		browser.element("//button[.='Reopen'][(ancestor::" + this.blockCancelDetailMain() + ")]")
		       .click()
	}

	unblockTask() {
		browser.element("//button[.='Unblock'][(ancestor::" + this.blockCancelDetailMain() + ")]")
		       .click()
	}

	/**
	 * add task
	 */
	get quickAddTaskButton() {
		return browser.element("//div[@class='taskquickaddtoggle-bar-title'][.='Add Task'][(ancestor::"
		                       + this.workPageMain + ")]");
	}

	get quickAddTaskFormMain() {
		return "form[h3[.='Add Task']]";
	}

	get addTaskModalMain() {
		return super.modal("Add Task");
	}

	addTaskModalMainCheck() {
		return browser.element("//" + this.addTaskModalMain)
	}

	addTaskField(option, parent) {
		return browser.element("//textarea[@label='" + option + "'][(ancestor::" + parent + ")]");
	}

	addTaskSelect(parent, field) {
		return browser.element("//div[contains(@class,'Select-placeholder')][.='" + field
		                       + "'][(ancestor::" + parent + ")]");
	}

	addTaskSubmit(parent) {
		return browser.element("//button[.='Create'][(ancestor::" + parent + ")]");
	}

	addTaskDue(parent) {
		return browser.element("//div[div[p[.='Due']]][(ancestor::" + parent + ")]")
	}

	useAddTaskForm(parent) {
		return {
			summary: this.addTaskField('Task Summary', parent),
			description: this.addTaskField('Task Description', parent),
			site: this.addTaskSelect(parent, 'Site'),
			assignee: this.addTaskSelect(parent, 'Assignee'),
			location: this.addTaskSelect(parent, 'Location/Asset'),
			labels: this.addTaskSelect(parent, 'Labels'), now: DatePicker.clickNow(),
			today: DatePicker.clickToday(), tomorrow: DatePicker.clickTomorrow()
		}
	}

	taskEntry(parent, taskEntry, obj) {
		for (var count = 0; count < taskEntry.length; count++) {
			if (taskEntry[count] === "summary" || taskEntry[count] === "description") {
				super.clickClearSet(this.useAddTaskForm(parent)[taskEntry[count]],
				                    obj[taskEntry[count]])
			} else if (taskEntry[count] === "site" || taskEntry[count] === "assignee"
			           || taskEntry[count] === "location") {
				super.useSelectMenu(this.useAddTaskForm(parent)[taskEntry[count]],
				                    obj[taskEntry[count]])
			} else if (taskEntry[count] === "addedDays") {
				this.addTaskDue(parent).click()
				DatePicker.useDatePicker(obj[taskEntry[count]])
			} else if (taskEntry[count] === "labels") {
				super.dynamicSendKeysLoop(this.useAddTaskForm(parent)[taskEntry[count]],
				                          obj[taskEntry[count]])
			} else if (taskEntry[count] === 'now' || taskEntry[count] === 'today'
			           || taskEntry[count] === 'tomorrow') {
				this.addTaskDue(parent).click()
				this.useAddTaskForm(parent)[taskEntry[count]].click()
			}
		}
	}

	quickAddTask(taskEntry, obj) {
		var menuVisible = false;
		while (menuVisible === false) {
			if (this.useAddTaskForm(this.quickAddTaskFormMain).summary.isVisible() != true
			    && SideBar.sideBarOpen.isVisible() != true) {
				this.quickAddTaskButton.click();
			} else if (SideBar.sideBarOpen.isVisible() === true) {
				SideBar.chevron.click()
			}
			menuVisible = this.useAddTaskForm(this.quickAddTaskFormMain).summary.isVisible();
		}
		this.taskEntry(this.quickAddTaskFormMain, taskEntry, obj);
		super.waitThenClick(this.addTaskSubmit(this.quickAddTaskFormMain));
	}

	useAddTaskModal(taskEntry, obj) {
		if (this.addTaskModalMainCheck().isVisible() != true) {
			SideBar.openAddTaskModal();
		}
		this.taskEntry(this.addTaskModalMain, taskEntry, obj);
		this.addTaskSubmit(this.addTaskModalMain).click();
	}

	createTaskToastMsg() {
		super.toastMsg('Task created').waitForVisible(super.globalWait());
	}

}

module.exports = new WorkPage();