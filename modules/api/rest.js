const request = require('request-promise') ;
const formData = require('form-data');

//
module.exports = class rest {
  constructor (method,uri,body){
    this.method = method;
    this.uri = uri;
    this.body = body;
  }

  post(){
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
          console.log(response)
          resolve(response);
        })
        .catch((err) =>{
          // Deal with the error
          console.log(err);
        })
        //resolve("cats")
      })
    }

  get(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
