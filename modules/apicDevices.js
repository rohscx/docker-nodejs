const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'GET';
const uri = "";
const headers = "";
const body = "";

class apicDevices extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
    this.managementInfo = "";
  }

  setHeaders(ticket){
    this.headers = {
        "content-type": "application/json",
        "x-auth-token": ticket,
      };
  }

  setUriBase (uriBase){
    const newUri = uriBase+"/api/v1/network-device"
    this.uri = newUri;
  }

  setUriPath (uriBase, path){
    const newUri = uriBase+path
    this.uri = newUri;
  }

  setManagementInfo (devicesObj){
    this.managementInfo = devicesObj;
  }

  getManagementInfo (searchCriteria){
    let search = "/"+searchCriteria+"/"+"gi";
    let mgmtData = this.managementInfo.response.networkDeviceManagementInfo;
    mgmtData.map((data,index) => {
      for (let [key, value] of Object.entries(data)) {
        if (data.hostname.match(search)){
          console.log("MATCH ",data)
        }        
      }
    })
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new apicDevices(method,uri,headers,body)
