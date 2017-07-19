var restReqeust = require('./modules/apicTicket');
let uri = "https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket";
let method = "POST";
let body = {
  "username":"devnetuser",
  "password":"Cisco123!"
};
restReqeust.p(uri,method,body).then(function(httpReturn){
  console.log(httpReturn);
})

//console.log(test) // REST POST
