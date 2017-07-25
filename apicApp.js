const apicTicket = require('./modules/apicTicket');
const apicDevices = require('./modules/apicDevices');
const apicConfig = require('./modules/apicConfig');
const apicReachability = require('./modules/apicReachability');
const apicDiscovery = require('./modules/apicDiscovery');
const ipTools = require('./modules/ipTools');
const rl = require('readline');
const program = require('commander');


/* These can be broken up into speperate .js files to accomplish a task
   ultimately some user interaction front end should be build, but this is a
   quick ad dirty....
   Note to self 240 characters can hold about 8 ip RANGES. <-- Batch Maximum!!
*/



let apiccReachability= () => {
  let processSuccess = false;
  return new Promise((resolve, reject) =>{
    apicTicket.debug()
    apicTicket.httpRequest()
      .then((ticketReturn) =>{
        console.log(ticketReturn);
        apicTicket.setTicketData(ticketReturn.response);
        apicReachability.setHeaders(apicTicket.getTicketData())
        apicReachability.setUriBase(apicTicket.getUriBase())
        return apicReachability.httpRequest()
      })
      .then((devicesReturn) =>{
        console.log(devicesReturn)
        apicReachability.setReturnData(devicesReturn)
        apicReachability.setUnreachable()
        console.log(apicReachability.getUnreachable())
        processSuccess = true;
        if (processSuccess) {
          resolve (devicesReturn)
        } else {
          reject("Something went wrong")
        };
      })
      .catch((httpReject) =>{
        console.log(httpReject);
      })
  })
};



let apiccDevices = () => {
  let processSuccess = false;
  return new Promise((resolve, reject) =>{
    apicTicket.debug()
    apicTicket.httpRequest()
      .then((ticketReturn) =>{
        console.log(ticketReturn);
        apicTicket.setTicketData(ticketReturn.response);
        apicDevices.setHeaders(apicTicket.getTicketData())
        apicDevices.setUriBase(apicTicket.getUriBase())
        return apicDevices.httpRequest()
      })
      .then((devicesReturn) =>{
        console.log(devicesReturn)
        processSuccess = true;
        if (processSuccess) {
          resolve (devicesReturn)
        } else {
          reject("Something went wrong")
        };
      })
      .catch((httpReject) =>{
        console.log(httpReject);
      })
  })
};



let apiccDiscoveryFileCheck = (dataBlob) => {
   let inputFile = dataBlob[0];
   let jobName = dataBlob[1];
  if (inputFile && jobName) {
    let processSuccess = false;
    return new Promise((resolve, reject) =>{
      Promise.all([ipTools.setFile(inputFile),ipTools.readFile()])
      .then((promiseReturn)=>{
        console.log(promiseReturn);
        return Promise.all([ipTools.cleanData(),ipTools.sortData(),ipTools.setBase(),ipTools.setSuperNet()])
      })
      .then((promiseReturn)=>{
        console.log(promiseReturn);
      })
      .catch((reject) =>{
        console.log(reject);
      })
    })
  }
}




// Reads the value of a properly formated CSV file, processes it, and stores it.
let apiccDiscovery = (dataBlob) => {
   let inputFile = dataBlob[0];
   let jobName = dataBlob[1];
  if (inputFile && jobName) {
    let processSuccess = false;
    return new Promise((resolve, reject) =>{
      Promise.all([ipTools.setFile(inputFile),ipTools.readFile()])
      .then((promiseReturn)=>{
        console.log(promiseReturn);
        return Promise.all([ipTools.cleanData(),ipTools.sortData(),ipTools.setBase(),ipTools.setSuperNet()])
      })
      .then((promiseReturn)=>{
        console.log(promiseReturn);
      })
      .catch((reject) =>{
        console.log(reject);
      })


      apicTicket.debug()
      apicTicket.httpRequest()
        .then((ticketReturn) =>{
          console.log(ticketReturn);
          apicTicket.setTicketData(ticketReturn.response);
          apicDiscovery.setHeaders(apicTicket.getTicketData());
          apicDiscovery.setUriBase(apicTicket.getUriBase());
          // Uses IP list to generate array with IP range and Job name objects
          apicDiscovery.setDiscoveryList(ipTools.getIpRange(),jobName);
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
              .catch((httpReject) =>{
                console.log(httpReject);
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
                ipTools.setSaveExtentions(".json")
                return ipTools.writeFile(status.response.rootId,JSON.stringify(status, null, 2))
                .then((writeReturn) => {
                  console.log(writeReturn)
                  processSuccess = true;
                  if (processSuccess) {
                    resolve(processSuccess);
                  } else {
                    reject("something went wrong")
                  }
                })
                .catch((httpReject) =>{
                  console.log(httpReject);
                })
              })
            })
          })
        })
        // Catches any errors from the HTTP Rest Request
        .catch((httpReject) =>{
          console.log(httpReject);
        })
    })
  }
}



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


program
  .version('0.1.0')

program
  .command('reachability')
  .alias('aRE')
  .description('apicReachability')
  .action(function(){
   return new Promise((resolve, reject) =>{
      let aaa = apiccReachability();
      if (aaa) {
      resolve(aaa)
      } else {
      reject(aaa)
      }
      
   })
    .then((blah)=>{
    console.log(blah)})
  });
   
program
  .command('apicDevices')
  .alias('aDE')
  .description('apicDevices')
  .action(function(){
    apiccDevices();
  });
 
program.parse(process.argv);

