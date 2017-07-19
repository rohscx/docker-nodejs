var request = require('request-promise') ;
var formData = require('form-data');

module.exports = class rest {
  constructor(method,uri,body) {
    this.method = method;
    this.uri = uri;
    this.body = body;
  }

  POST(){
    return new Promise(function(resolve, reject) {
      const options = {
        method: this.method,
        uri: this.uri,
        body:this.body,
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
