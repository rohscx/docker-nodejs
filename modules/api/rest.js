var httpRequest = require("http-request")
var http = require("http")
module.exports = () => {
// multipart/form-data request built with form-data (3rd party module)
// you have to use the http export of FormData
// the instanceof operator fails otherwise
// implementing a manual check is not very elegant
var form = new http.FormData();

form.append('username', 'devnetuser');
form.append('password', 'Cisco123');

http.post({
	url: 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket',
	reqBody: form
}, function (err, res) {
	if (err) {
		console.error(err);
		return;
	}
	
	console.log(res.code, res.headers, res.buffer.toString());
});
  return (
    {anotherTestResponse: "Cats on everything from API REst"}
  );
}
