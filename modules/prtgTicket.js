const rest = require('./api/rest');
const securityFile = require('../securityFile')


// Private Cisco ISE resource on the INTRAnet
const privatePrtg = {
  body:{
    "username": securityFile.private.prtg.uName,
    "password": securityFile.private.prtg.uPass
  },
  uri: securityFile.private.prtg.uri
};


baseConvert64 = (uName,uPass) => {
  let data = uName +":"+uPass;
  let newData = "Basic " + new Buffer(data).toString('base64');
  return newData;
}

let prtgHeaders = {
  ""
};

const method = 'GET';
const uri = privatePrtg.body.username ? privatePrtg.uri : "Check Security File";
const rejectCert = false;
const uriBase = privatePrtg.body.username ? privatePrtg.uri : "Check Security File";
const headers = prtgHeaders;
const body = "";

class prtgTicket extends rest {
  constructor (method,uri,rejectCert,headers,body){
    super(method,uri,rejectCert,headers,body)
    this.prtgCred = "&"+ privatePrtg.body.username + "&passhash="+privatePrtg.body.password;
  }

  getHeaders (){
    return this.headers;
  }

  getUri (){
    return this.uri;
  }

  getPrtgCred (){
    return this.prtgCred;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"rejectCert: "+this.rejectCert,'\n',"uriBase: "+this.uriBase,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new prtgTicket(method,uri,rejectCert,headers,body)
