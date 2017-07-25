const rest = require('./api/rest');
const securityFile = require('../securityFile')


// Private Cisco ApicEM resource on the INTRAnet
const privateApicEm = {
  body:{
    "username": securityFile.private.apicEM.uName,
    "password": securityFile.private.apicEM.uPass
  },
  uri: securityFile.private.apicEM.uri
};

// Public Cisco ApicEM resource on the INTERnet
const publicApicEm = {
  body:{
    "username": securityFile.public.apicEM.uName,
    "password": securityFile.public.apicEM.uPass
  },
  uri: securityFile.public.apicEM.uri
};

let apicHeaders = {
  "content-type": "application/json"
};

const method = 'POST';
const uriPublic = publicApicEm.uri+"/api/v1/ticket";
const uriPrivate = privateApicEm.uri+"/api/v1/ticket";
const rejectCert = false;
const uriBasePublic = publicApicEm.uri;
const uriBasePrivate = privateApicEm.uri;
const headers = apicHeaders;
const bodyPublic = publicApicEm.body;
const bodyPrivate = privateApicEm.body;

class apicTicket extends rest {
  constructor (method,uriPublic,rejectCert,headers,bodyPublic){
    super(method,uriPublic,rejectCert,headers,bodyPublic)
    this.ticket = "";
    this.uriBase = uriBasePublic;
    this.
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

module.exports = new apicTicket(method,uriPublic,rejectCert,headers,bodyPublic)
