
const http = require('http');
const url = require('url');
const requestHandler = require('./requestHandler');
const router = require('./router');

const host = '192.168.1.113';
const port = 9999;

function start() {
	http.createServer((req, res) => {
		var pathname = url.parse(req.url).pathname;
		console.log(`request for ${pathname} received.`);

		var postData = '';
		req.setEncoding('utf-8');
		req.addListener('data', (chunk) => {
			postData += chunk;
			console.log(`receive post data ${chunk}.`);
		});
		req.addListener('end', () => {
			router.route(requestHandler.mock, pathname, res, postData);
		});
	}).listen(port, host, () => {
		console.log(`server running at ${host}:${port}.`);
	});
}

exports.start = start;
