const request = require('request-promise') ;
const formData = require('form-data');

//
module.exports = class rest {
  constructor (method,uri,body){
    this.method = method;
    this.uri = uri;
    this.body = body;
  }

  httpRequest(){
    return new Promise((resolve, reject) =>{
      const options = {
        method: this.method,
        uri: this.uri,
        body: this.body,
        json: true
      // JSON stringifies the body automatically
      }
      request(options)
        .then((response) =>{
          resolve(response);
        })
        .catch((err) =>{
          // Deal with the error
        })
      })
    }

  get(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
