const apicTicket = require('./modules/apicTicket');
const apicDevices = require('./modules/apicDevices');
const apicConfig = require('./modules/apicConfig');
const apicReachability = require('./modules/apicReachability');
const apicDiscovery = require('./modules/apicDiscovery');
const ipTools = require('./modules/ipTools');


/* These can be broken up into speperate .js files to accomplish a task
   ultimately some user interaction front end should be build, but this is a
   quick ad dirty....
   Note to self 240 characters can hold about 8 ip RANGES. <-- Batch Maximum!!
*/


// Reads the value of a properly formated CSV file, processes it, and stores it.
/*
ipTools.setFile("ipList.csv")
ipTools.writeFile("gogogogo","Cats on everthing because this does not work yet")
.then((writeReturn) =>{
  console.log(writeReturn)
})
ipTools.readFile()
.then((readReturn) =>{
  console.log(readReturn)
})
*/
//ipTools.readFile()
//console.log(ipTools.readFile())
//console.log(ipTools.cleanData())
//ipTools.readFile()
//.then((readReturn) => {
//  console.log(ipTools.cleanData())
//})
Promise.all([ipTools.setFile("ipList.csv"),ipTools.readFile(),ipTools.cleanData()])
.then((dataRe)=>{
  console.log(dataRe);
})
.catch((reject) =>{
  console.log(reject);
})
//ipTools.formatData(20)
//console.log(ipTools.getData())
//console.log(ipTools.getIpRange())
//.then((fileReturn) =>{
  //  console.log("promise return",fileReturn)
//})
//ipTools.formatData(20);
//console.log(ipTools.getIpRange());




/*

apicTicket.debug()
apicTicket.httpRequest()
  .then((ticketReturn) =>{
    console.log(ticketReturn);
    apicTicket.setTicketData(ticketReturn.response);
    apicDiscovery.setHeaders(apicTicket.getTicketData());
    apicDiscovery.setUriBase(apicTicket.getUriBase());
    // Uses IP list to generate array with IP range and Job name objects
    apicDiscovery.setDiscoveryList(ipRangeArray,"JOBTEST__NAME_");
    console.log(apicDiscovery.getDiscoveryList())
    let discoveryList = apicDiscovery.getDiscoveryList();
    return new Promise((resolve, reject) =>{
      discoveryList.map((data) =>{
        let type = "multi range";
        //console.log(data);
        //console.log(data[0].jobName);
        //console.log(data[0].ipRange);
        apicDiscovery.setBody(data[0].jobName,type,data[0].ipRange);
        apicDiscovery.debug();
        //Uses ticket to pull device list
        return apicDiscovery.httpRequest()
        .then((discoveryReturn) =>{
          apicDiscovery.setDiscoveryTickets(discoveryReturn);
          // normalizes indexOf to work with .length
          let indexPosition = discoveryList.indexOf(data) + 1;
          let dataLength = discoveryList.length;
          // Verifies all array items have been processed before resolving promise
          if (indexPosition == dataLength) {
              resolve(apicDiscovery.getDiscoveryTickets());
          }
        })
      })
    })
    .then((discoveryResult) =>{
      discoveryResult.map((data) => {
        console.log(data);
        console.log(data[0].response.url);
        apicDiscovery.setUri(data[0].response.url);
        apicDiscovery.setNewReqest();
        return apicDiscovery.httpRequest()
        .then((status) =>{
          console.log(status);
        })
      })
    })
  })
  // Catches any errors from the HTTP Rest Request
  .catch((httpReject) =>{
    console.log(httpReject);
  })
*/

/*
// Gets an ApicEM Ticket
// Apic Ticket debug
apicTicket.debug()
apicTicket.httpRequest()
  .then((ticketReturn) =>{
    console.log(ticketReturn);
    apicTicket.setTicketData(ticketReturn.response);
    apicDevices.setHeaders(apicTicket.getTicketData());
    apicDevices.setUriBase(apicTicket.getUriBase());
    // Uses ticket to pull device list
    return apicDevices.httpRequest();
  })
  .then((devicesReturn) =>{
    console.log(devicesReturn);
    apicConfig.setHeaders(apicTicket.getTicketData());
    apicConfig.setUriBase(apicTicket.getUriBase());
    apicConfig.setDeviceId("4af8bf34-295f-46f4-97b7-0a2d2ea4cf22");
    apicConfig.setUri();
    // Uses ticket to pull a single device config
    return apicConfig.httpRequest();
  })
  .then((configReturn) =>{
    // prints out stringified JSON
    console.log(JSON.stringify(configReturn));
    // prints out pretty string
    console.log(configReturn.response.toString())
    apicReachability.setHeaders(apicTicket.getTicketData());
    apicReachability.setUriBase(apicTicket.getUriBase());
    // Uses ticket to pull device reachablidy information
    return apicReachability.httpRequest();
  })
  .then((reachabilityReturn) =>{
    console.log(reachabilityReturn);
  })
  // Catches any errors from the HTTP Rest Request
  .catch((httpReject) =>{
    console.log(httpReject);
  })
*/
