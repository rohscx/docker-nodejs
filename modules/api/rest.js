var httpRequest = require("http-request")
var http = require("http")
module.exports = () => {
var reqBody = {
	param1: 'value1',
	param2: 'value2'
};

// this serialization also does URL encoding so you won't have to
reqBody = querystring.stringify(reqBody);

http.post({
	url: 'http://localhost/post',
	reqBody: new Buffer(reqBody),
	headers: {
		// specify how to handle the request, http-request makes no assumptions
		'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
	}
}, 'post.bin', function (err, res) {
	if (err) {
		console.error(err);
		return;
	}
	
	console.log(res.code, res.headers, res.file);
});
  return (
    {anotherTestResponse: "Cats on everything from API REst"}
  );
}
