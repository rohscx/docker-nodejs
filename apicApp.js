var restReqeust = require('./modules/apicTicket');
let method = 'POST';
let uri = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket';
let body = {
  "username":"devnetuser",
  "password":"Cisco123!"
};
restReqeust.POST(method,uri,body).then(function(httpReturn){
  console.log(httpReturn);
})

//console.log(test) // REST POST
