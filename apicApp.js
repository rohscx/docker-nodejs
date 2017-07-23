const apicTicket = require('./modules/apicTicket');
const apicDevices = require('./modules/apicDevices');
const apicConfig = require('./modules/apicConfig');
const apicReachability = require('./modules/apicReachability');
const apicDiscovery = require('./modules/apicDiscovery');
const ipTools = require('./modules/ipTools');
const rl = require('readline');


let prompts = rl.createInterface(process.stdin, process.stdout);
let apicInterface = {
  greeting: "What would you like to do?",
  mainMenu: {
    one: "1 : Apic-EM Discovery",
    two: "2 : PLACE HOLDER",
    three: "3 :  Apic Device Search",
    nine: "9 : Return to main Menu"
  }
};
let apicMenu = () => {
  Object.keys(apicInterface.mainMenu).map(function(key, index) {
       console.log(apicInterface.mainMenu[key]);
     })
}

console.log(apicMenu())


prompts.question(apicInterface.greeting, (number)=>{
  switch(number) {
      case "1":
          apiccDiscovery()
          .then((apiccReturn) =>{
            console.log(apicMenu())
            //process.exit();
          })
          break;
      case "2":
          console.log("NADA")
          prompts.setPrompt('do you hava any gold?')
          prompts.prompt()
          //prompts.on('line',)
          break;
      case "3":
          apiccDevices()
          .then((apiccReturn) =>{
            prompts.setPrompt(apicMenu())
            prompts.prompt()
            //process.exit();
          })
          console.log("NADA")
          break;
      case "9":
          console.log("NADA")
          break;
      default:
          console.log("NO WAY")
  }



})







/* These can be broken up into speperate .js files to accomplish a task
   ultimately some user interaction front end should be build, but this is a
   quick ad dirty....
   Note to self 240 characters can hold about 8 ip RANGES. <-- Batch Maximum!!
*/



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
        }
      })
      .catch((httpReject) =>{
        console.log(httpReject);
      })

  })
}



// Reads the value of a properly formated CSV file, processes it, and stores it.
let apiccDiscovery = () => {
  let processSuccess = false;
  return new Promise((resolve, reject) =>{
    Promise.all([ipTools.setFile("ipList.csv"),ipTools.readFile()])
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
        apicDiscovery.setDiscoveryList(ipTools.getIpRange(),"JOBNAME_JOBDESCRIPTION_");
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
