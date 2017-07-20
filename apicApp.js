const apicTicket = require('./modules/apicTicket');
const apicDevices = require('./modules/apicDevices');

// Apic Ticket debug
apicTicket.debug()

apicTicket.httpRequest()
  .then((httpReturn) =>{
    console.log(httpReturn);
    apicTicket.ticketData(httpReturn.response);
    return apicDevices.httpRequest()
  }).then((httpReturn) =>{

  })
  .catch((httpReject) =>{
    console.log(JSON.stringify(httpReject));
  })



//console.log(test) // REST POST
