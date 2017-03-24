
const http = require('http');

const host = '192.168.2.103';
const port = 9999;

var server = http.createServer((req, res) => {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello World!");
	res.end();
});

server.listen(port, host, () => {
	console.log(`server running at ${host}:${port}.`);
});
