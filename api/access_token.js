const config = require('../config');
const getAccessToken = require('../web/getAccessToken');

module.exports = (req, res) => {
	const { code, state } = req.query;
	if (!code) {
		res.send('invalid code');
		return;
	}

	if (!state || state !== config.state) {
		return res.send('invalid satate value');
	}

	let redirectURI = req.query.origin || config.origin;

	let hasError = false;
	getAccessToken(code)
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				return Promise.reject(data)
			}
			const location = redirectURI + '?access_token=' + data.access_token
			res.writeHead(301, { Location: location }).end();
		})
		.catch(err => {
			if (err.error_description) {
				return res.send(err.error_description);
			}
			
			res.writeHead(301, { Location: redirectURI }).end();
		})
}