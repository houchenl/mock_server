
const fs = require('fs');


function mock(param, res, postData) {
	param = paramToFileName(param);
	// res.end(`param ` + param);

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

	var pre = '/Users/liulei/workspace/nodejs/my_mock/files/';
	var suf = '.json';
	return pre + param + suf;
	// return '/Users/liulei/workspace/nodejs/my_mock/files/_a_b.json';
	// return './files/_a_b.json';
}

exports.mock = mock;
