var restReqeust = require('./modules/apicTicket');
let s = new restRequest('GET','https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket',{
  "username":"devnetuser",
  "password":"Cisco123!"
})
restReqeust.POST().then(function(httpReturn){
  console.log(httpReturn);
})

//console.log(test) // REST POST
