const config = require('../config');

const queryStringify = query => {
  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
    .join('&')
  return queryString
}

module.exports = (req, res) => {
	const githubOauthUrl = 'https://github.com/login/oauth/authorize';
	let redirectURI = config.redirectURI;
	const origin = req.query.origin || '';
	if (origin !== '') {
		redirectURI = redirectURI + '?origin=' + origin;
	}
	const query = {
		client_id: config.appId,
		redirect_uri: redirectURI,
		scope: 'public_repo',
		state: config.state
	}

	const location = `${githubOauthUrl}?${queryStringify(query)}`;
	res.writeHead(301, { Location: location }).end();
}