
function route(handle, pathname, res, postData) {
	console.log(`about to route a request for ${pathname}.`);

	handle(pathname, res, postData);
}

exports.route = route;
