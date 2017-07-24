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
let uriFunc = () => {
  if (privateApicEm != false) {
    return publicApicEm.uri+"/api/v1/ticket";
  } else {
    return privateApicEm.uri+"/api/v1/ticket";
  }
}
let uri = uriFunc;
const rejectCert = false;
let uriBaseFunc = () => {
  if (privateApicEm != false) {
    return publicApicEm.uri;
  } else {
    return privateApicEm.uri;
  }
}
let uriBase = uriBaseFunc
const headers = apicHeaders;
let bodyFunc = () => {
  if (privateApicEm != false) {
    return publicApicEm.body;
  } else {
    return privateApicEm.body;
  }
}
let body = bodyFunc;
console.log("body+>",body(),"URIBASE=>",uriBase(),"uri=>",uri())

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

module.exports = new apicTicket(method,uri,rejectCert,headers,body
