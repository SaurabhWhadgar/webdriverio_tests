/**
 * Created by chrismanning on 7/5/17.
 */

class Page {
	constructor() {
		this.title = 'My Page'
	}

	pageHeader(header) {
		return browser.element("//div[@class='page-header'][//*[.='" + header + "']]")
	}

	modal(modalName) {
		return "div[contains(@class,'scimodal-content')][//*[.='"+modalName+"']]"
	}

	globalWait() {
		return 60000;
	}

	open(path) {
		browser.url('/' + path)
	}

	toastMsg(msg) {
		return browser.element(
			"//*[contains(text(),'" + msg + "')][(ancestor::*[@class='sysmsgwrap'])]")
	}

	mainTab(page) {
		return "div[@class='maintab'][.//*[.='" + page + "']]"
	}

	dynamicMenuContent(value) {
		return browser.element(
			"//*[.='" + value + "'][(ancestor::div[@class='Select-menu-outer'])]")
	}

	useSelectMenu(menu,content){
		menu.click()
		this.dynamicMenuContent(content).click();
	}

	clickClearSet(element, value) {
		element.click();
		element.clearElement();
		element.setValue(value);
	}

	waitThenClick(element){
		element.waitForVisible(this.globalWait());
		element.click();
	}

	dynamicSendKeysLoop(element,value){
		element.click();
		for (var count = 0; count < value.length; count++) {
			element.keys(value[count]);
			element.keys("Enter");
		}
	}

	checkForElement(element,msg) {
		if(element.isVisible() != true) {
			throw new Error(msg+' not visible on page');
		}
	}

}
module.exports = Page