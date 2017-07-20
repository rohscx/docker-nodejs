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


const method = 'POST';
const uri = publicApicEm.uri;
const body = publicApicEm.body;

console.log(method," ",uri," ",body)
class apicTicket extends rest {
  constructor (method,uri,body){
    super(method,uri,body)
  }
  multiply(a,b) { return a * b }
  divde(a,b) { return a / b }
  debug() {console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"body: "+this.body)}
}

//let test = new apicTicket(method,uri,body);

module.exports = new apicTicket(method,uri,body)
