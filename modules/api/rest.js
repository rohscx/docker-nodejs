const request = require('request-promise');
const requestSynchronous = require('request');
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

  httpRequestSynchronous(){
    var options = {
      method: this.method,
      url: this.uri,
      headers: this.headers,
      body: this.body,
      json: true
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        //var info = JSON.parse(body);
        this.returnData = body;
        // debug
        console.log(body);
      }
    }
    requestSynchronous(options, callback);
  }

  httpRequest(){
    return new Promise((resolve, reject) =>{
      const options = {
        method: this.method,
        uri: this.uri,
        rejectUnauthorized: this.rejectCert,
        headers: this.headers,
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
