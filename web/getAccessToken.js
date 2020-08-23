const config = require('../config');
const fetch = require('node-fetch');

module.exports = function(code) {
	const url = 'https://github.com/login/oauth/access_token';
	const body = {
		client_id: config.appId,
		client_secret: config.appSecret,
		code: code,
		state: config.state
	}

	return fetch(url, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Accept': 'application/json'
		},
	})
}