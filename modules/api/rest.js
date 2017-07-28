const request = require('request-promise') ;
const formData = require('form-data');

//
module.exports = class rest {
  constructor (method,uri,rejectCert,headers,body){
    this.method = method;
    this.uri = uri;
    this.rejectCert = rejectCert;
    this.headers = headers;
    this.body = body;
  }

  httpRequest(){
    return new Promise((resolve, reject) =>{
      const options = {
        method: this.method,
        uri: this.uri,
        rejectUnauthorized: this.rejectCert,
        headers: this.headers,
        body: this.body,
        json: true,
        timeout:1200000
      // JSON stringifies the body automatically
      }
      request(options)
        .then((response) =>{
          resolve(response);
        })
        .catch((err) =>{
          // Deal with the error
          reject(err);
        })
      })
    }

  get(){
    return (
      {anotherTestResponse: "Cats on everything from API REst GET"}
    )
  }
}
