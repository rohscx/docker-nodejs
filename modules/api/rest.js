var request = require('request');
var formData = require('form-data');

module.exports.httpPost= () => {
    var formData = {
  // Pass a simple key-value pair 
  username: 'devnetuser',
  password: 'Cisco123'
};
request.post({url:'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket', formData: formData}, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
});
  return (
    {anotherTestResponse: "Cats on everything from API REst"}
  );
}

module.exports.httpGET= () => {
  return (
    {anotherTestResponse2: "Cats on everything from API REst"}
  );
}
