const config = require('../config');
const fetch = require('node-fetch');

function onResult(res) {
	const info = {
		status: res.status
	}

	return res.json().then(data => {
		info.data = data;
		return Promise.resolve(info)
	})
}

module.exports = {
	get (url,query) {
		let fullUrl = url
		if (query) {
			const params = new URLSearchParams(query)
			fullUrl = `${url}?${params}`
		}
		return fetch(fullUrl, {
			method: 'get',
			headers: {
					'Accept': 'application/vnd.github.v3.full+json',
					'Authorization': `token ${config.accessToken}`,
			},
		}).then( response => onResult(response) )
	},

	post(url,body) {
		fetch(url, {
			method: 'post',
			body:    JSON.stringify(body),
			headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'Accept': 'application/vnd.github.v3.full+json',
					'Authorization': `token ${config.accessToken}`,
			},
		}).then( response => onResult(response) )
	}
}