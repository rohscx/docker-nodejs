const rest = require('./api/rest');
const securityFile = require('../securityFile')


// Private Cisco ISE resource on the INTRAnet
const privateIse = {
  body:{
    "username": securityFile.private.ise.uName,
    "password": securityFile.private.ise.uPass
  },
  uri: securityFile.private.ise.uri
};


baseConvert64 = (uName,uPass) => {
  let data = uName +":"+uPass;
  console.log(new Buffer(data).toString('base64'))
  return new Buffer(data).toString('base64')
}

let iseHeaders = {
  "Authorization": baseConvert64(securityFile.private.ise.uName,securityFile.private.ise.uPass),
  "Accept": "application/vnd.com.cisco.ise.network.networkdevice.1.1+xml"
};

const method = 'GET';
const uri = privateIse.body.username ? privateIse.uri : "Check Security File";
const rejectCert = false;
const uriBase = privateIse.body.username ? privateIse.uri : "Check Security File";
const headers = iseHeaders;
const body = "";

class iseTicket extends rest {
  constructor (method,uri,rejectCert,headers,body){
    super(method,uri,rejectCert,headers,body)
  }

  getHeaders (){
    return this.headers;
  }

  getUri (){
    return this.uri;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"rejectCert: "+this.rejectCert,'\n',"uriBase: "+this.uriBase,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new iseTicket(method,uri,rejectCert,headers,body)
