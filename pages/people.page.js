/**
 * Created by brianb on 7/6/17.
 */

var Page = require('./page');
var SideBar = require('./sideBar');

class PeoplePage extends Page {

	open() {
		super.open('users');
	}

	get peoplePageMain() {
		return super.mainTab('People');
	}

	peoplePageCheck() {
		browser.element("//" + this.peoplePageMain).waitForVisible(super.globalWait())
	}

	/**
	 * people
	 */
	choosePeopleTab() {
		browser.element("//a[contains(@class,'page-nav-list-item-link')][.='People'][(ancestor::"
		                + this.peoplePageMain + ")]").click()
	}

	/**
	 * invite person
	 */
	openInvitePersonModal() {
		return browser.element("//span[.='Invite Person'][(ancestor::" + this.peoplePageMain + ")]")
	}

	inviteNewPersonModalMain() {
		return super.modal('Invite New Person')
	}

	inviteNewPersonFields(field, index) {
		return browser.element("./descendant::input[@label='" + field + "'][(ancestor::"
		                       + this.inviteNewPersonModalMain() + ")][" + index + "]")
	}

	inviteNewPersonRole(index) {
		return browser.element("./descendant::div[contains(@class,'mod-reactselect')][label[.='Role']][(ancestor::"
		                       + this.inviteNewPersonModalMain() + ")][" + index + "]")
	}

	inviteNewPersonTeam() {
		return browser.element(".//div[@class='Select-placeholder'][contains(text(),'Select one"
		                       + " or more teams')][(ancestor::" + this.inviteNewPersonModalMain()
		                       + ")]");
	}

	inviteAnother() {
		return browser.element("//span[.='Invite Another'][(ancestor::"
		                       + this.inviteNewPersonModalMain() + ")]")
	}

	invitePersonButton(objArray) {
		var buttonTxt;
		if (objArray.length === 1) {
			buttonTxt = 'Invite 1 Person'
		} else {
			buttonTxt = 'Invite ' + objArray.length + ' People'
		}
		return browser.element("//span[.='" + buttonTxt + "'][(ancestor::"
		                       + this.inviteNewPersonModalMain() + ")]")
	}

	inviteNewPerson(objArray) {
		this.openInvitePersonModal().click()
		for (var count = 0; count < objArray.length; count++) {
			super.clickClearSet(this.inviteNewPersonFields('First Name', count + 1),
			                    objArray[count]["userFName"]);
			super.clickClearSet(this.inviteNewPersonFields('Last Name', count + 1),
			                    objArray[count]["userLName"]);
			super.clickClearSet(this.inviteNewPersonFields('Phone/Email', count + 1),
			                    objArray[count]["userEmail"]);
			super.useSelectMenu(this.inviteNewPersonRole(count + 1), objArray[count]["role"]);
			if (objArray[count]["role"] === 'Member' || objArray[count]["role"]
			                                            === 'Basic Member') {
				this.inviteNewPersonTeam().waitForVisible(super.globalWait())
				super.useSelectMenu(this.inviteNewPersonTeam(), objArray[count]["teams"][0])
			}
			if (count + 1 === objArray.length) {
				this.invitePersonButton(objArray).click()
			} else {
				this.inviteAnother().click();
			}
		}
	}

	invitePersonToasMsg() {
		super.toastMsg('Person invited').waitForVisible(super.globalWait())
	}

	inviteMultiplePeopleToastMsg(num) {
		super.toastMsg(num + ' people invited').waitForVisible(super.globalWait())
	}

	/**
	 * user list & details
	 */
	userListMain() {
		return "div[@class='peoplelist']"
	}

	userInList(value) {
		return browser.element("//li[contains(@class,'peoplelist-list-item')][.//span[contains(text(), '"
		                       + value + "')]]")
	}

	userDetailMain() {
		return "div[@class='peopledetails']"
	}

	userRole(role) {
		return browser.element("//span[@class='statusbar-message'][span[.='Account"
		                       + " type']][.//div[@class='Select-value'][.='" + role
		                       + "']][(ancestor::" + this.userDetailMain() + ")]")
	}

	userFLName(name) {
		return browser.element("//span[.='" + name + "'][(ancestor::" + this.userDetailMain()
		                       + ")]")
	}

	userEmailPhone(value) {
		return browser.element("//input[contains(@value,'" + value + "')][(ancestor::"
		                       + this.userDetailMain() + ")]")
	}

	userNoPhone() {
		return browser.element("//*[contains(text(),'###-###-####')][(ancestor::"
		                       + this.userDetailMain() + ")]");
	}

	userTeamsSitesTab(tab) {
		return browser.element("//a[contains(@class,'tabs-nav-list-item-link')][.='" + tab
		                       + "'][(ancestor::" + this.userDetailMain() + ")]");
	}

	userAddToTeam() {
		return browser.element("//div[contains(@class,'mod-reactselect')][p[contains(text(),'Add To"
		                       + " Team')]][(ancestor::" + this.userDetailMain() + ")]")
	}

	addUserToTeam(obj) {
		this.userTeamsSitesTab('teams').click();
		for (var count = 0; count < obj["teams"].length; count++) {
			if (this.userTeamInList(obj["teams"][count]).isVisible() != true) {
				super.useSelectMenu(this.userAddToTeam(), obj["teams"][count]);
			}
		}
	}

	removeUserFromTeam(teams) {
		this.userTeamsSitesTab('teams').click();
		for (var count = 0; count < teams.length; count++) {
			if (this.userTeamInList(teams[count]).isVisible() === true) {
				this.userTeamListRemove(teams[count]).click();
			}
		}
	}

	userTeamListMain() {
		return "ul[@class='peopledetailsteam-list']"
	}

	userTeamInList(teamName) {
		return browser.element("//a[@class='peopledetailsteam-list-item-name'][.='" + teamName
		                       + "'][(ancestor::" + this.userTeamListMain() + ")]")
	}

	userTeamListRemove(value) {
		return browser.element("//i[contains(@class,'close-circle')][(ancestor::li[@class='peopledetailsteam-list-item'][a[contains(text(), '"
		                       + value + "')]])]")
	}

	selectUserInList(obj) {
		this.userInList(obj["username"]).waitForVisible(super.globalWait());
		this.userInList(obj["username"]).click();
	}

	checkUserDetails(obj) {
		browser.element("//" + this.userDetailMain()).waitForVisible(super.globalWait());
		super.checkForElement(this.userFLName(obj["userFName"]), 'user detail = '
		                                                         + obj["userFName"]);
		super.checkForElement(this.userFLName(obj["userLName"]), 'user detail = '
		                                                         + obj["userLName"]);
		super.checkForElement(this.userEmailPhone(obj["userEmail"]), 'user detail = '
		                                                             + obj["userEmail"]);
		super.checkForElement(this.userRole(obj["role"]), 'user detail = ' + obj["role"]);
		if (this.userNoPhone().isVisible() != true) {
			super.checkForElement(this.userEmailPhone(obj["userPhone"]), 'user detail = '
			                                                             + obj["userPhone"]);
		}
		this.userTeamsSitesTab('teams').click();
		for (var count = 0; count < obj["teams"].length; count++) {
			super.checkForElement(this.userTeamInList(obj["teams"][count]), 'user detail = '
			                                                                + obj["teams"][count]);
		}
	}

	editUserDetails(oObj, eObj, editArray) {
		for (var count = 0; count < editArray.length; count++) {
			if (editArray[count] === "userFName" || editArray[count] === "userLName") {
				this.userFLName(oObj[editArray[count]]).click();
				browser.pause(1000);
				this.userFLName(oObj[editArray[count]]).setValue(eObj[editArray[count]])
			} else if (editArray[count] === "userEmail") {
				super.clickClearSet(this.userEmailPhone(oObj[editArray[count]]),
				                    eObj[editArray[count]])
			} else if (editArray[count] === "userPhone") {
				if (this.userNoPhone().isVisible() === true) {
					browser.element("//input[@name='phone'][(ancestor::" + this.userDetailMain()
					                + ")]").setValue(eObj[editArray[count]]);
				} else {
					super.clickClearSet(this.userEmailPhone(oObj[editArray[count]]),
					                    eObj[editArray[count]])
				}
			}
		}
	}

	/**
	 * teams
	 */
	chooseTeamsTab() {
		if (SideBar.sideBarOpen.isVisible() === true) {
			SideBar.chevron.click()
		}
		browser.element("//a[contains(@class,'page-nav-list-item-link')][.='Teams'][(ancestor::"
		                + this.peoplePageMain + ")]").click()
	}

	/**
	 * new team
	 */
	openNewTeamModal() {
		return browser.element("//span[.='New Team'][(ancestor::" + this.peoplePageMain + ")]")
	}

	newTeamModalMain() {
		return super.modal('Create New Team');
	}

	newTeamNameDesc(field) {
		return browser.element("//input[@name='" + field + "'][(ancestor::"
		                       + this.newTeamModalMain() + ")]")
	}

	newTeamSites() {
		return browser.element("//div[contains(@class,'mod-reactselect')][label[.='Sites']][(ancestor::"
		                       + this.newTeamModalMain() + ")]")
	}

	createTeamButton() {
		return browser.element("//button[.='Create Team'][(ancestor::" + this.newTeamModalMain()
		                       + ")]")
	}

	createANewTeam(obj) {
		this.openNewTeamModal().click()
		super.clickClearSet(this.newTeamNameDesc('name'), obj["teamName"]);
		super.clickClearSet(this.newTeamNameDesc('description'), obj["description"]);
		for (var count = 0; count < obj["sites"].length; count++) {
			super.useSelectMenu(this.newTeamSites(), obj["sites"][count])
		}
		this.createTeamButton().click();
	}

	teamCreatedToastMsg() {
		super.toastMsg('Team created').waitForVisible(super.globalWait());
	}

	/**
	 * team list & details
	 */
	teamListMain() {
		return "div[@class='teamlist']"
	}

	teamInList(value) {
		return browser.element("//li[contains(@class,'teamlist-list-item')][.//span[contains(text(), '"
		                       + value + "')]]")
	}

	selectTeamInList(obj) {
		this.teamInList(obj["teamName"]).waitForVisible(super.globalWait());
		this.teamInList(obj["teamName"]).click();
	}

	teamDetailsMain() {
		return "div[@class='teamdetails']";
	}

	teamNameDesc(value) {
		return browser.element("//input[@value='" + value + "'][(ancestor::"
		                       + this.teamDetailsMain() + ")]")
	}

	teamMembersSiteTab(tab) {
		return browser.element("//a[contains(@class,'tabs-nav-list-item-link')][.='" + tab
		                       + "'][(ancestor::" + this.teamDetailsMain() + ")]");
	}

	teamMemberSiteInList(teamName) {
		return browser.element("//a[contains(@class,'teamdetails-list-item-name')][.='" + teamName
		                       + "'][(ancestor::" + this.teamDetailsMain() + ")]")
	}

	teamListRemove(index) {
		return browser.element("./descendant::i[contains(@class,'close-circle')][(ancestor::"
		                       + this.teamDetailsMain() + ")][" + index + "]")
	}

	checkTeamDetails(obj, members) {
		members = members || false;
		browser.element("//" + this.teamDetailsMain()).waitForVisible(super.globalWait());
		super.checkForElement(this.teamNameDesc(obj["teamName"]), 'team name = ' + obj["teamName"]);
		super.checkForElement(this.teamNameDesc(obj["description"]), 'team description = '
		                                                             + obj["description"]);
		if (members === true) {
			this.teamMembersSiteTab('members').click();
			for (var count = 0; count < obj["members"].length; count++) {
				super.checkForElement(
					this.teamMemberSiteInList(obj["members"][count]), 'team members = '
					                                                  + obj["description"]);
			}
		}
		this.teamMembersSiteTab('sites').click();
		for (var count = 0; count < obj["sites"].length; count++) {
			super.checkForElement(this.teamMemberSiteInList(obj["sites"][count]), 'team sites = '
			                                                                      + obj["description"]);
		}
	}

}

module.exports = new PeoplePage();