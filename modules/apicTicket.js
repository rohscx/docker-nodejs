const rest = require('./api/rest');
const securityFile = require('./secuirtyFile')


// Private Cisco ApicEM resource on the INTRAnet
const privateApicEm{
  body:{
    "username":private.apicEm.uName,
    "password":private.apicEm.uPass
  },
  uri: private.apicEm.uri
};

// Public Cisco ApicEM resource on the INTERnet
const publicApicEm{
  body:{
    "username":public.apicEm.uName,
    "password":public.apicEm.uPass
  },
  uri: public.apicEm.uri
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
