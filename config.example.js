module.exports = {
  appId: 'your github appid',
  appSecret: 'secret',
  origin: 'http://example.com', //允许跨域的域名
  accessToken: 'person access token',
  state: 'random string',
  redirectURI: 'https://example.com/api/access_token' //授权成功跳转地址
}