const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'GET';
const uri = "";
const headers = "";
const body = "";

class apicReachability extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
    this.returnData = [];
    this.unReachable = [];
  }

  setHeaders(ticket){
    this.headers = {
        "content-type": "application/json",
        "x-auth-token": ticket,
      };
  }

  setUriBase(uriBase){
    const newUri = uriBase+"/api/v1/reachability-info"
    this.uri = newUri;
  }

  setReturnData (httpDataArray){
    this.returnData = httpDataArray;
  }

  setUnreachable(){
    let returnData = this.returnData.response;
    returnData.map((data,index) => {
      for (let [key, value] of Object.entries(data)) {
        if (value != "Reachable" || "REACHABLE") {
          this.unReachable.push(returnData[index])
        }
      }
    })
  }

  getUnreachable(){
    return this.unReachable;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new apicReachability(method,uri,headers,body)
