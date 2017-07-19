var request = require('request-promise') ;
var formData = require('form-data');

module.exports = class rest {

  POST(){
    const options = {  
    method: 'POST',
    uri: 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket',
    body: {
      "username":"devnetuser",
      "password":"Cisco123!"
    },
    json: true 
      // JSON stringifies the body automatically
  }
  request(options)  
  .then(function (response) {
    console.log(response);
    callback(null, response);
    resolve(response);
    return response;
  })
  .catch(function (err) {
    // Deal with the error
  })
  }

  GET(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
