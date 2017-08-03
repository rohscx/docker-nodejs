const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'GET';
const uri = "";
const headers = "";
const body = "";

class prtgLookUp extends rest {
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

  setUri(uriBase){
    let newUri = uriBase+"/api/table.json?content=sensors&output=json&columns=objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite"
    this.uri = newUri;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new prtgLookUp(method,uri,headers,body)
