const apicTicket = require('./modules/apicTicket');
const apicDevices = require('./modules/apicDevices');
const apicConfig = require('./modules/apicConfig');

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
    apicConfig.setHeaders(apicTicket.getTicketData());
    apicConfig.setDeviceId("4af8bf34-295f-46f4-97b7-0a2d2ea4cf22");
    apicConfig.setUri();
    return apicConfig.httpRequest();
  })
  .then((configReturn) =>{
    console.log(JSON.stringify(configReturn));
    console.log(configReturn.toString())
  })
  .catch((httpReject) =>{
    console.log(JSON.stringify(httpReject));
  })



//console.log(test) // REST POST
