/**
 * Created by chrismanning on 7/12/17.
 */

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

module.exports = {
	testDate (daystoadd) {
		var days = daystoadd;
		var date = new Date();
		date.setDate(date.getDate() + parseInt(days));
		var dateArray = date.toString().split(' ');
		var mm = MonthMap.get(dateArray[1]).toString();
		var dd = dateArray[2].toString();
		var yyyy = dateArray[3];
		return [mm, dd, yyyy];
	},

	parseDate(daystoadd, stripZero){
		var date = this.testDate(daystoadd);
		var mm;
		var dd = date[1];
		var yyyy = date[2];
		if (stripZero == true) {
			mm = date[0].replace(/^(0+)/g, '');
		} else {
			mm = date[0];
		}
		return {mm: mm, dd: dd, yyyy: yyyy};
	},

	displayDate (daystoadd, stripZero) {
		var __ret = this.parseDate(daystoadd, stripZero);
		return __ret.yyyy + "-" + __ret.mm + "-" + __ret.dd;
	},

	commentDate (daystoadd, stripZero){
		var __ret = this.parseDate(daystoadd, stripZero);
		return __ret.mm + "/" + __ret.dd + "/" + __ret.yyyy;
	},

	blockTaskDate (daystoadd) {
		var date = this.testDate(daystoadd);
		var mm = MonthMap.get(date[0]);
		var dd = date[1].replace(/^(0+)/g, '');
		return dd + ' ' + mm;
	},

	roundDate (daystoadd){
		var date = this.testDate(daystoadd);
		var mm = MonthMap.get(date[0]);
		var dd = date[1].replace(/^(0+)/g, '');
		;
		var yyyy = date[2];
		return mm + " " + dd + " " + yyyy;
	}
}