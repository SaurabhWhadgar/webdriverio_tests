var Misc = require('./misc');

const USER_LIST = [
	{
		userName:'Test User3',
		email: 'testuser33@guerrillamailblock.com',
		phone:'15125550157',
		password:'tu3'
	},
	{
		userName:'Test User4',
		email: 'testuser4@guerrillamailblock.com',
		phone:'12025550146',
		password:'tu4'
	},
	{
		userName:'Test User5',
		email: 'testuser5@guerrillamailblock.com',
		phone:'15125550159',
		password:'tu5'
	},
	{
		userName:'Test User6',
		email: 'testuser6@guerrillamailblock.com',
		phone:'15125550187',
		password:'tu6'
	},
	{
		userName:'Test User7',
		email: 'testuser7@guerrillamailblock.com',
		phone:'15125550121',
		password:'tu7'
	},
	{
		userName:'Test User8',
		email: 'testuser8@guerrillamailblock.com',
		phone:'12025550167',
		password:'tu8'
	},
	{
		userName:'Test User9',
		email: 'testuser9@guerrillamailblock.com',
		phone:'15125550163',
		password:'tu9'
	},
	{
		userName:'Test User10',
		email: 'testuser10@guerrillamailblock.com',
		phone:'15125550176',
		password:'tu10'
	},
	{
		userName:'Test User11',
		email: 'testuser11@guerrillamailblock.com',
		phone:'15125550190',
		password:'tu11'
	},
	{
		userName:'Test User1',
		email: 'testuser1@guerrillamailblock.com',
		phone:'12148675309',
		password:'tu1'
	}
];

class Users {
	static logInUser() {
			const choice = Misc.getRandomIntInclusive(0,8);
			return USER_LIST[choice];
	}
}

module.exports = {
	USER_LIST,
	Users,
};
