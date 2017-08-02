/**
 * Created
 * by chrismanning on 7/6/17.
 */
var Page = require('./page');

class SideBar extends Page {

	get sideBarMain() {
		return "nav[contains(@class,'sidenav')]";
	}

	get sideBarOpen() {
		return browser.element("//nav[contains(@class,'sidenav')]"
			+ "[contains(@class,'is-open')]");
	}

	get chevron() {
		return browser.element(
			"//i[contains(@class,'chevron-right')][(ancestor::" + this.sideBarMain + ")]");
	}

	sideBarNavLink(link) {
		return browser.element("//span[@class='sidenav-list-item-link-text'][.='" + link + "']"
			+ "[(ancestor::" + this.sideBarMain + ")]")
	}

	get userAvatar() {
		return browser.element("./descendant::*[@id='NavBarAvatar']"
			+ "[.//span[@class='useravatar-text']][1]");
	}

	userMenuOption(option) {
		return browser.element(
			"//span[contains(text(),'" + option + "')][(ancestor::*[@class='usernav'])]")
	}

	useUserMenu(option) {
		this.userAvatar.click();
		this.userMenuOption(option).waitForVisible(super.globalWait())
		this.userMenuOption(option).click()
	}

	useSideBarNav(link) {
		if (this.sideBarOpen.isVisible() != true) {
			this.chevron.click();
		}
		this.sideBarNavLink(link).waitForVisible(super.globalWait())
		this.sideBarNavLink(link).click()
	}

	navToWorkPage() {
		this.useSideBarNav('Work');
	}

	navToDashboardPage() {
		this.useSideBarNav('Dashboard');
	}

	navToEnergyPage() {
		this.useSideBarNav('Energy');
	}

	navToPeoplePage() {
		this.useSideBarNav('People');
	}

	navToSitesPage() {
		this.useSideBarNav('Sites');
	}

	openAddTaskModal() {
		this.useSideBarNav('Add Task')
	}

}
module.exports = new SideBar();