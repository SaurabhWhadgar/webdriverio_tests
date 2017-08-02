/**
 * Created by chrismanning on 7/14/17.
 */
var Page = require('./page');
var displayDates = require('./utility/displayDates')

var MonthMap = new Map();
MonthMap.set("January", "01");
MonthMap.set("February", "02");
MonthMap.set("March", "03");
MonthMap.set("April", "04");
MonthMap.set("May", "05");
MonthMap.set("June", "06");
MonthMap.set("July", "07");
MonthMap.set("August", "08");
MonthMap.set("September", "09");
MonthMap.set("October", "10");
MonthMap.set("November", "11");
MonthMap.set("December", "12");
MonthMap.set("Jan", "01");
MonthMap.set("Feb", "02");
MonthMap.set("Mar", "03");
MonthMap.set("Apr", "04");
MonthMap.set("May", "05");
MonthMap.set("Jun", "06");
MonthMap.set("Jul", "07");
MonthMap.set("Aug", "08");
MonthMap.set("Sep", "09");
MonthMap.set("Oct", "10");
MonthMap.set("Nov", "11");
MonthMap.set("Dec", "12");
MonthMap.set("01", "January");
MonthMap.set("02", "February");
MonthMap.set("03", "March");
MonthMap.set("04", "April");
MonthMap.set("05", "May");
MonthMap.set("06", "June");
MonthMap.set("07", "July");
MonthMap.set("08", "August");
MonthMap.set("09", "September");
MonthMap.set("10", "October");
MonthMap.set("11", "November");
MonthMap.set("12", "December");

class DatePicker extends Page {

	get datePickerMain() {
		return "div[@class='datepicker']"
	}

	get currentDate() {
		return browser.element(
			"//span[@class='datepicker__current-month'][(ancestor::" + this.datePickerMain + ")]")
	}

	get nextMonth() {
		return browser.element(
			"//a[contains(@class,'next')][(ancestor::" + this.datePickerMain + ")]")
	}

	nowTodayTmrw(choice) {
		return browser.element("//div[contains(@class,'" + choice
		                       + "')][(ancestor::div[@class='datepicker__custom'])]")
	}

	datePickerDay(day, choice) {
		return browser.element(
			"./descendant::div[contains(@class,'datepicker__day')] [.='" + day + "'][" + choice
			+ "]")
	}

	checkMonth(month) {
		var onCurrentMonth = false
		var clicks = 0;
		while (onCurrentMonth === false && clicks < 13) {
			var currentDate = this.currentDate.getText();
			var splitDate = currentDate.split(' ');
			var splitDateNumber = MonthMap.get(splitDate[0]);
			if (splitDateNumber != month) {
				onCurrentMonth = false
				clicks++
				this.nextMonth.click();
			} else {
				onCurrentMonth = true
			}
		}
	}

	clickDay(day) {
		if (day >= 25) {
			this.datePickerDay(day.toString(), '2').click();
		} else {
			this.datePickerDay(day.toString(), '1').click();
		}
	}

	clickNow() {
		return this.nowTodayTmrw('now');
	}

	clickToday() {
		return this.nowTodayTmrw('today');
	}

	clickTomorrow() {
		return this.nowTodayTmrw('tomorrow');
	}


	useDatePicker(daysToAdd) {
		var date = displayDates.testDate(daysToAdd);
		var mm = date[0];
		var dd = date[1].replace(/^(0+)/g, '');
		this.checkMonth(mm);
		this.clickDay(dd);
	}

}
module.exports = new DatePicker();