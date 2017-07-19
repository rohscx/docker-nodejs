var request = require('request');
var formData = require('form-data');



module.exports = class Rest {
  POST(){
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
      {anotherTestResponse: "Cats on everything from API REst POST"}
    )
  }

  GET(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
