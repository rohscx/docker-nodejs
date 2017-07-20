const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'GET';
const uri = securityFile.public.apicEM.uri+"/network-device";
const headers = "";
const body = "";

class apicConfig extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
    this.deviceId = "";
  }

  setHeaders(ticket){
    this.headers = {
        "content-type": "application/json",
        "x-auth-token": ticket,
      };
  }

  setDeviceId(deviceId){
    this.deviceId = "/"+deviceId;
  }

  setUri(){
    this.uri = this.uri+this.deviceId+"/config";
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new apicConfig(method,uri,headers,body)