const client = require('../web/client')
const allowCROS = require('../web/cros')

module.exports = (req, res) => {
	const url = `https://api.github.com${req.url}`
	allowCROS(res)

	client.get(url).then(info => {
		res.status(info.status)
		res.send(JSON.stringify(info.data))
	}).catch(err => {
		res.status(500)
		res.send(JSON.stringify(err))
	})
}