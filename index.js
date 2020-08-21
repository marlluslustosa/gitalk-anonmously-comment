const fetch = require('node-fetch');

function submitComment(info) {
    fetch('https://httpbin.org/post', {
        method: 'post',
        body:    JSON.stringify(info.body),
        headers: { 
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/vnd.github.v3.full+json',
						'Authorization': `token ${info.token}`,
        },
    })
    .then(res => res.json())
		.then(json => console.log(json))
		.catch(err => {
			console.log(err);
		})
}

