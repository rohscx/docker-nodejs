const apicTicket = require('./modules/apicTicket');
const apicDevices = require('./modules/apicDevices');
const apicConfig = require('./modules/apicConfig');
const apicReachability = require('./modules/apicReachability');
const apicDiscovery = require('./modules/apicDiscovery');
const dataTools = require('./modules/dataTools');
const cliTools = require('./modules/cliTools');
const iseTicket = require('./modules/iseTicket');
const iseNetDevices = require('./modules/iseNetDevices');

const rl = require('readline');
const program = require('commander');
const colors = require('colors');
const parseString = require('xml2js').parseString;
/* These can be broken up into speperate .js files to accomplish a task
   ultimately some user interaction front end should be build, but this is a
   quick ad dirty....
   Note to self 240 characters can hold about 8 ip RANGES. <-- Batch Maximum!!
*/


let iseTest2 = (inputFile) => {
  if (inputFile) {
    let processSuccess = false;
    return new Promise((resolve, reject) =>{
      Promise.all([dataTools.setJsonFile(inputFile),dataTools.readJsonFile()])
      .then((promiseReturn)=>{
        //console.log(promiseReturn);
        dataTools.getData()
        .then((readData)=>{
          let chunkCount = dataTools.getChunks(readData).length
          let chunks = dataTools.getChunks(readData);
          function sleep(time, callback) {
            var stop = new Date().getTime();
            while(new Date().getTime() < stop + time) {
              ;
            }
            callback();
          }
          iseNetDevices.setHeaders(iseTicket.getHeaders())
          let uriBase = iseTicket.getUri();
          uriBase += ":9060/ers/config/networkdevice";
          chunks.map((data) =>{
            console.log("HIT")
            sleep(1000, function() {
               // executes after one second, and blocks the thread
               data.map((data)=>{
                 console.log(data)
                 
                 let newUri = uriBase + "/"+data.id;
                 iseNetDevices.setUri(newUri)
                 iseNetDevices.debug()
                 iseNetDevices.httpRequest()
                 .then((httpResponse) => {
                   parseString(iseNetDevices.getreturnData(), (err,result) =>{
                     //let newResult1 = result['ns4:networkdevice']['$'].name
                     //let newResult2 = result['ns4:networkdevice'].NetworkDeviceIPList[0].NetworkDeviceIP[0].ipaddress[0]
                     //console.log(newResult1)
                     //console.log(newResult2)
                      console.log(result)
                   })
                   .catch((reject) =>{
                   console.log(reject);
                 });

                 })
               });
            });
          });
        })
        .catch((reject) =>{
          console.log(reject);
        })
      })
      .catch((reject) =>{
        console.log(reject);
      })
    })
  }
}


let iseTest = () =>{
  iseTicket.debug()
  iseNetDevices.setHeaders(iseTicket.getHeaders())
  iseNetDevices.setUriBase(iseTicket.getUri())
  iseNetDevices.setUri()
  iseNetDevices.debug()
  return iseNetDevices.httpRequest()
  .then((iseReturn) =>{
  // debug raw XML return
  //console.log(iseReturn)
  //iseNetDevices.setDeviceList(iseReturn)
  iseNetDevices.getDeviceListJson(iseReturn)
  })
  .then((iseReturn) =>{
    let finalTotal = iseNetDevices.getPageCount();
    for (let i = 1; i < finalTotal; i++) {
      console.log(i)
      iseNetDevices.setReturnPage(i + 1);
      //console.log(iseNetDevices.getReturnPage());
      iseNetDevices.setUri(iseNetDevices.getReturnPage())
      iseNetDevices.debug()
      Promise.all([iseNetDevices.httpRequest()])
      .then((netDevicesList1)=>{
        //iseNetDevices.setDeviceList(temp)
        if (i + 1 == finalTotal){
          //debug
          //console.log(iseNetDevices.getDeviceJsonArray())
          dataTools.setSaveExtentions(".json")
          let fileName = "iseDevices-"+Date.now()
          return dataTools.writeFile(fileName,JSON.stringify(iseNetDevices.getDeviceJsonArray()))
          .then((writeReturn) =>{
            console.log(writeReturn)
          })
          .catch((httpReject) =>{
            console.log(httpReject);
          })
        }
        iseNetDevices.getDeviceListJson(netDevicesList1)
        .catch((httpReject) =>{
        console.log(httpReject);
        })
      })
    }
  })
  .catch((httpReject) =>{
  console.log(httpReject);
  })
}

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
        // debug
        //console.log(devicesReturn)
        apicReachability.setReturnData(devicesReturn)
        apicReachability.setUnreachable()
        //console.log(apicReachability.getUnreachable())
        dataTools.setSaveExtentions(".json")
        let rechName = "reachJob-"+Date.now();
        processSuccess = true;
        if (processSuccess) {
          resolve (devicesReturn)
        } else {
          reject("Something went wrong")
        };
        return dataTools.writeFile(rechName,JSON.stringify(apicReachability.getUnreachable(), null, 2))
      })
      .then((writeReturn) =>{
        console.log(writeReturn)
        apicReachability.setUnreachableBrief()
        dataTools.setSaveExtentions(".csv")
        let reachNameBrief = "reachJobBrief-"+Date.now()
        return dataTools.writeFile(reachNameBrief,apicReachability.getUnreachableBrief())
      })
      .then((writeReturn) =>{
        console.log(writeReturn)
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
        apicDevices.setUriPath(apicTicket.getUriBase(),"/api/v1/network-device")
        return apicDevices.httpRequest()
      })
      .then((devicesReturn) =>{
        // debug
        console.log(devicesReturn)
        // sets the color of key value pair
        cliTools.setInputFile(devicesReturn.response)
        cliTools.cliPrint("green","blue")
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

let apiccDevicesMgmtInfo = (deviceName) => {
  let processSuccess = false;
  return new Promise((resolve, reject) =>{
    apicTicket.debug()
    apicTicket.httpRequest()
      .then((ticketReturn) =>{
        console.log(ticketReturn);
        apicTicket.setTicketData(ticketReturn.response);
        apicDevices.setHeaders(apicTicket.getTicketData())
        apicDevices.setUriPath(apicTicket.getUriBase(),"/api/v1/network-device")
        return apicDevices.httpRequest()
      })
      .then((devicesReturn) =>{
        //console.log(devicesReturn)
        apicDevices.setManagementInfo(devicesReturn)
        apicDevices.getManagementInfo(deviceName)
        // debug
        //console.log(apicDevices.getSearchResult())
        // sets the color of key
        cliTools.setInputFile(apicDevices.getSearchResult())
        cliTools.cliPrint("green","white")
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

let apiccDiscoveryFileCheck = (inputFile,jobName) => {
  if (inputFile && jobName) {
    let processSuccess = false;
    return new Promise((resolve, reject) =>{
      Promise.all([dataTools.setFile(inputFile),dataTools.readFile()])
      .then((promiseReturn)=>{
        console.log(promiseReturn);
        return Promise.all([dataTools.cleanData(),dataTools.sortData(),dataTools.setBase(),dataTools.setSuperNet()])
      })
      .then((promiseReturn)=>{
        apicDiscovery.setDiscoveryList(dataTools.getIpRange(),jobName)
        console.log(apicDiscovery.getDiscoveryList())
        console.log(promiseReturn);
      })
      .catch((reject) =>{
        console.log(reject);
      })
    })
  }
}




// Reads the value of a properly formated CSV file, processes it, and stores it.
let apiccDiscovery = (inputFile,jobName) => {
  if (inputFile && jobName) {
    let processSuccess = false;
    return new Promise((resolve, reject) =>{
      Promise.all([dataTools.setFile(inputFile),dataTools.readFile()])
      .then((promiseReturn)=>{
        console.log(promiseReturn);
        return Promise.all([dataTools.cleanData(),dataTools.sortData(),dataTools.setBase(),dataTools.setSuperNet()])
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
          apicDiscovery.setDiscoveryList(dataTools.getIpRange(),jobName);
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
                dataTools.setSaveExtentions(".json")
                return dataTools.writeFile(status.response.rootId,JSON.stringify(status, null, 2))
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




let appMenu = () => {
  program
    .version('0.1.0')

  program
    .command('iseTest2')
    .alias('iRe2')
    .arguments ('<inputFile>')
    .description('iseLoadJson')
    .action(function(inputFile){
      iseTest2(inputFile);
    });


  program
    .command('iseTest')
    .alias('iRe')
    .description('iseTest')
    .action(function(){
      iseTest();
    });

  program
    .command('apicDevices-Management-Info')
    .alias('aDeMI')
    .arguments ('<deviceName>')
    .description('apicDevices management-into')
    .action(function(deviceName){
       apiccDevicesMgmtInfo(deviceName);
    });

  program
    .command('reachability')
    .alias('aRe')
    .description('apicReachability')
    .action(function(){
      apiccReachability();
    });

  program
    .command('apicDevices')
    .alias('aDe')
    .description('apicDevices')
    .action(function(){
      apiccDevices();
    });


    program
      .command('apicDiscovery')
      .alias('aDi')
      .arguments ('<inputFile> <jobName>')
      .description('apicDiscovery')
      .action(function(inputFile,jobName){
         apiccDiscovery(inputFile,jobName);
      });

    program
      .command('apicDiscoveryFileCheck')
      .alias('aDiF')
      .arguments ('<inputFile> <jobName>')
      .description('apicDiscoveryFileCheck')
      .action(function(inputFile,jobName){
         apiccDiscoveryFileCheck(inputFile,jobName);
      });

  program.parse(process.argv);
    if (!process.argv.slice(2).length) {
      program.outputHelp(make_red);
    };

  function make_red(txt) {
    return colors.green(txt); //display the help text in red on the console
  }
};

appMenu()
