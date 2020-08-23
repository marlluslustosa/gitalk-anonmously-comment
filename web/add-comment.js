const config = require('../config');
const fetch = require('node-fetch');

module.exports = function(info) {
	return fetch(info.body.postUrl, {
		method: 'post',
		body:    JSON.stringify({body: info.body.content}),
		headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Accept': 'application/vnd.github.v3.full+json',
				'Authorization': `token ${config.accessToken}`,
		},
	})
}