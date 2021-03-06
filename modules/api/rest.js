const request = require('request-promise');
const formData = require('form-data');


//
module.exports = class rest {
  constructor (method,uri,rejectCert,headers,body){
    this.method = method;
    this.uri = uri;
    this.rejectCert = rejectCert;
    this.headers = headers;
    this.body = body;
    this.returnData = "";
  }

  getreturnData(){
    return this.returnData
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
      // JSON stringifies the body automatically
        timeout: 120000
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
