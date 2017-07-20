const apicTicket = require('./modules/apicTicket');
const apicDevices = require('./modules/apicDevices');

// Apic Ticket debug
apicTicket.debug()

apicTicket.httpRequest()
  .then((ticketReturn) =>{
    console.log(ticketReturn);
    apicTicket.setTicketData(ticketReturn.response);
    apicDevices.setHeaders(apicTicket.getTicketData());
    return apicDevices.httpRequest();
  })
  .then((devicesReturn) =>{
    console.log(devicesReturn);
  })
  .catch((httpReject) =>{
    console.log(JSON.stringify(httpReject));
  })



//console.log(test) // REST POST
