const config = require('../config');

module.exports = function(res) {
	res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Access-Control-Allow-Origin', config.origin)
	// another common pattern
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)
}