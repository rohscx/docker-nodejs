var request = require('request-promise') ;
var formData = require('form-data');

module.exports = class rest {

  POST(){
    return new Promise(function(resolve, reject) {
      const options = {
        method: 'GET',
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
          resolve(response);
        })
        .catch(function (err) {
          // Deal with the error
        })
        //resolve("cats")
      })
    }

  GET(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
