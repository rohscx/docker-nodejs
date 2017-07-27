const rest = require('./api/rest');
const securityFile = require('../securityFile')


// Private Cisco ApicEM resource on the INTRAnet
const privateIse = {
  body:{
    "username": securityFile.private.ise.uName,
    "password": securityFile.private.ise.uPass
  },
  uri: securityFile.private.ise.uri
};

// Public Cisco ApicEM resource on the INTERnet
const publicIse = {
  body:{
    "username": securityFile.public.ise.uName,
    "password": securityFile.public.ise.uPass
  },
  uri: securityFile.public.ise.uri
};

baseConvert64 = (uName,Upass) => {
  let data = uname +":"upass;
  return parseInt(data, 64)
}

let iseHeaders = {
  "Authorization": baseConvert64(securityFile.private.ise.uName,securityFile.private.ise.uPass)
};

const method = 'GET';
const uri = privateIse.body.username ? privateIse.uri : "Check Security File";
const rejectCert = false;
const uriBase = privateIse.body.username ? privateIse.uri : "Check Security File";
const headers = iseHeaders;
const body = "";

class apicTicket extends rest {
  constructor (method,uri,rejectCert,headers,body){
    super(method,uri,rejectCert,headers,body)
  }

  getUriBase (){
    return this.uriBase;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"rejectCert: "+this.rejectCert,'\n',"uriBase: "+this.uriBase,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new apicTicket(method,uri,rejectCert,headers,body)
