const rest = require('./api/rest');
const securityFile = require('../securityFile')


// Private Cisco ApicEM resource on the INTRAnet
const privateApicEm = {
  body:{
    "username":private.ApicEM.uName,
    "password":private.apicEM.uPass
  },
  uri: private.apicEm.uri
};

// Public Cisco ApicEM resource on the INTERnet
const publicApicEm = {
  body:{
    "username":public.apicEM.uName,
    "password":public.apicEM.uPass
  },
  uri: public.apicEM.uri
};


const method = 'POST';
const uri = publicApicEm.uri;
const body = publicApicEm.body;

class requestApicTicket extends rest {
constructor(method,uri,body){
  super(method,uri,body)
}
  multiply(a,b) { return a * b }
  divde(a,b) { return a / b }
}


module.exports = new requestApicTicket()
