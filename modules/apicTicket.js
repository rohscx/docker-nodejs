const rest = require('./api/rest');
const securityFile = require('../securityFile')


if (securityFile.public.apicEM.uName == false) {
  const ApicEm = {
    body:{
      "username": securityFile.public.apicEM.uName,
      "password": securityFile.public.apicEM.uPass
    },
    uri: securityFile.public.apicEM.uri
  };
} else {
  const ApicEm = {
    body:{
      "username": securityFile.private.apicEM.uName,
      "password": securityFile.private.apicEM.uPass
    },
    uri: securityFile.private.apicEM.uri
  };
}

// Private Cisco ApicEM resource on the INTRAnet
/*
const ApicEm = {
  body:{
    "username": securityFile.private.apicEM.uName,
    "password": securityFile.private.apicEM.uPass
  },
  uri: securityFile.private.apicEM.uri
};
*/
// Public Cisco ApicEM resource on the INTERnet

let apicHeaders = {
  "content-type": "application/json"
};
const method = 'POST';
const uri = ApicEm.uri+"/api/v1/ticket";
const rejectCert = false;
const uriBase = ApicEm.uri;
const headers = apicHeaders;
const body = ApicEm.body;

class apicTicket extends rest {
  constructor (method,uri,rejectCert,headers,body){
    super(method,uri,rejectCert,headers,body)
    this.ticket = "";
    this.uriBase = uriBase;
  }

  setTicketData (ticket) {
    const  newTicket = ticket;
    this.ticket = newTicket.serviceTicket;
    return newTicket;
  }

  getTicketData (){
    return this.ticket;
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
