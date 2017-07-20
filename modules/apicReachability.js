const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'GET';
const uri = securityFile.public.apicEM.uri+"/apicReachability";
const headers = "";
const body = "";

class apicReachability extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
  }

  setHeaders(ticket){
    this.headers = {
        "content-type": "application/json",
        "x-auth-token": ticket,
      };
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new apicReachability(method,uri,headers,body)
