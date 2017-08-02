/**
 * Created by chrismanning on 7/11/17.
 */
var Page = require('./page');
var SideBar = require('../pages/sideBar');

class SitesPage extends Page{
	open(){
		super.open('sites');
	}
	sitesPageMain(){
		return super.mainTab('Sites');
	}
	get tabListSelect(){
		return "li[contains(@class,'tabs-nav-list-item')][contains(@class,'mod-left')]"
	}
	get newType(){
		return "a[contains(@class,'link')][contains(@class,'mod-default')]"
	}
	get addLocModalMain() {
		return "div[contains(@class,'scimodal-content')]"
		+ "[.//div[contains(@class,'scimodal-content-header')][.='New Location Type']]"
	}
	get addAssetModalMain(){
		return "div[contains(@class,'scimodal-content')]"
			+ "[.//div[contains(@class,'scimodal-content-header')][.='New Asset Type']]"
	}
	get addLabelModalMain(){
		return "div[contains(@class,'scimodal-content')]"
			+ "[.//div[contains(@class,'scimodal-content-header')][.='Add Label']]"
	}
	sitesPageCheck(){
		browser.element("//"+this.sitesPageMain()).waitForVisible(super.globalWait())
	}
	siteNavLink(name){
		return browser.element("//*[@class='sitebox'][div[div[*[.='"+name+"']]]]")
	}
	sitesHeader(header){
		return browser.element("//div[@class='sitestab-page-header-site'][//*[.='" + header + "']]")
	}
	siteSectionTab(value){
		return browser.element("//a[contains(text(),'" + value + "')][(ancestor::*[@class='page-nav-list'])]")
	}
	newRoundButton(){
		return browser.element(".//button[.='New Round']")
	}
	newButton(value){
		return browser.element(".//button[span[.='" + value + "']]")
	}
	checkStrategiesTab(){
		return browser.element("//div[@class='sitemaintenance-header-title'][//*[.='By Asset Type']]")
	}
	checkSettingsTab(){
		return browser.element("//div[@class='sitesettingsinfo']")
	}
	addLocField(option) {
		return browser.element("//input[@type='" + option + "']");
	}
	addlocDropDown(value) {
		return browser.element("//div[contains(@class,'Select-placeholder')][.='" + value + "']");
	}
	addLocSubmit() {
		return browser.element("//button[.='Create'][(ancestor::" + this.addLocModalMain + ")]");
	}
	addAssetSubmit() {
		return browser.element("//button[.='Create'][(ancestor::" + this.addAssetModalMain + ")]");
	}
	addLabelSubmit() {
		return browser.element("//button[.='Create Label'][(ancestor::" + this.addLabelModalMain + ")]");
	}
	settingsTabs(value) {
		return browser.element("//*[contains(text(),'" + value + "')][(ancestor::" + this.tabListSelect + ")]")
	}
	addNewLink(name){
		return browser.element("//span[contains(text(),'" + name + "')][(ancestor::" + this.newType + ")]")
	}
	chooseSite(name){
		this.pageHeader('Sites').waitForVisible(super.globalWait());
		this.siteNavLink(name).waitForVisible(super.globalWait());
		this.siteNavLink(name).click();
	}
	inSite(header){
		if (SideBar.sideBarOpen.isVisible() === true) {
			SideBar.chevron.click()
		}
		this.sitesHeader(header).waitForVisible(super.globalWait());
	}
	navToTabs(value){
		if (SideBar.sideBarOpen.isVisible() === true) {
			SideBar.chevron.click()
		}
		this.siteSectionTab(value).waitForVisible(super.globalWait());
		this.siteSectionTab(value).click();
	}
	newButtonCheck(value){
		this.newButton(value).waitForVisible(super.globalWait());
	}
	newRoundButtonCheck(){
		this.newRoundButton().waitForVisible(super.globalWait());
	}
	checkStrategies(){
		this.checkStrategiesTab().waitForVisible(super.globalWait());
	}
	checkSettings(){
		this.checkSettingsTab().waitForVisible(super.globalWait());
	}
	createNewLocationType(value){
		this.settingsTabs('Location Types').click();
		this.addNewLink('New Type').click();
		super.clickClearSet(this.addLocField('text'), value);
		this.addLocSubmit().click();
	}
	createNewAssetType(value){
		this.settingsTabs('Asset Types').click();
		this.addNewLink('New Type').click();
		super.clickClearSet(this.addLocField('text'), value);
		this.addAssetSubmit().click();
	}
	createNewLabel(value){
		this.settingsTabs('Labels').click();
		this.addNewLink('New Label').click();
		super.clickClearSet(this.addLocField('text'), value);
		this.addLabelSubmit().click();
	}
	useAddLocForm(parent){
		return{
			name: this.addLocField('text'),
			quantity: this.addLocField('number'),
			locationType: this.addlocDropDown('Location Type'),
			parentLocation: this.addlocDropDown('Parent Location')
		}
	}
	locEntry(locEntry, obj){
		for(var count = 0; count < locEntry.length; count++){
			if(locEntry[count] === "name"){
				super.clickClearSet(this.useAddLocForm()[locEntry[count]], obj[locEntry[count]])
			} else if (locEntry[count] === "locationType" || locEntry[count] === "parentLocation"){
				super.useSelectMenu(this.useAddLocForm()[locEntry[count]], obj[locEntry[count]])
			}
		}
	}
	addLocation(locationEntry, obj){
		if(SideBar.sideBarOpen.isVisible() === true){
				SideBar.chevron.click()
		}
		this.navToTabs('Locations');
		this.newButton('Add Locations').click();
		this.locEntry(locationEntry, obj)
		this.addLocSubmit().click();
	}
	createToastMsg(msg) {
		super.toastMsg(msg).waitForVisible(super.globalWait());
	}
}
module.exports = new SitesPage();