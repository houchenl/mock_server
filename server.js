
const http = require('http');
const url = require('url');
const fs = require('fs');

const host = '192.168.1.105';
const port = 9999;

// create server
const server = http.createServer((req, res) => {
	var pathname = url.parse(req.url).pathname;
	console.log(`request for ${pathname} received.`);

	var postData = '';
	req.setEncoding('utf-8');
	req.addListener('data', (chunk) => {
		postData += chunk;
		console.log(`receive post data ${chunk}.`);
	});
	req.addListener('end', () => {
		mock(pathname, res, postData);
	});
})

// start server
server.listen(port, host, () => {
	console.log(`server running at ${host}:${port}.`);
});

// res read data
function mock(param, res, postData) {
	param = paramToFileName(param);
	// res.end(`param ` + param);

	console.log(`about to read file ${param}`);
	fs.readFile(param, (err, data) => {
	  if (err) {
		res.writeHead(404, {"Content-Type": "text/plain"});
	    res.write("404 Not found");
	    res.end();
	  } else {
	  	res.writeHead(200, {"Content-Type": "application/json"});
	  	res.write(data);
	  	res.end();
	  }	  
	});
}

function paramToFileName(param) {
	param = param.replace(/\//g, '_');

	var pre = './files/';
	var suf = '.json';
	return pre + param + suf;
	// return '/Users/liulei/workspace/nodejs/my_mock/files/_a_b.json';
	// return './files/_a_b.json';
}
