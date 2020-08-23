const fetch = require('node-fetch');
const config = require('../config');
const addComment = require('../web/add-comment')
const allowCROS = require('../web/cros')

function getRequestInfo(req) {
	const headers = req.headers;
	const { post, origin, authorization,referer} = headers;
	const info = { post, origin, authorization,referer };
	info.userAgent = headers['user-agent'];
	info.body = Object.assign({},req.body);

	return info;
}

function onSuccess(res,data) {
	console.log(data);
	res.setHeader('Content-Type','application/json;charset=UTF-8')
	allowCROS(res);
	res.send(JSON.stringify(data));
}

function onFailure(res,err) {
	allowCROS(res);

	res.status(err.status)
	res.send(err.message)
}

module.exports = (req, res) => {
	try {
		const info = getRequestInfo(req);
		addComment(info)
			.then(res => {
				if (res.status >= 200 && res.status < 300) {
					return res.json();
				}
				
				return Promise.reject({
					status: res.status,
					message: res.statusText
				})
			})
			.then(data => onSuccess(res,data))
			.catch(err => onFailure(res,{
				status: 500,
				message: JSON.stringify(err)
			}))
	} catch(err) {
		onFailure(res,{ 
			status: 500,
			message: '500 internel error'
		})
	}
}