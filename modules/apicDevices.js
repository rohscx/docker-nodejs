const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'GET';
const uri = "";
const headers = "";
const body = "";

class apicDevices extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
    this.managementInfo = {
      responose:[],
      devices:[]
    };
  }

  setHeaders(ticket){
    this.headers = {
        "content-type": "application/json",
        "x-auth-token": ticket,
      };
  }

  setUriBase (uriBase){
    const newUri = uriBase+"/api/v1/network-device"
    this.uri = newUri;
  }

  setUriPath (uriBase, path){
    const newUri = uriBase+path
    this.uri = newUri;
  }

  setManagementInfo (devicesObj){
    this.managementInfo = devicesObj;
  }

  getManagementInfo (searchCriteria){
    let search = new RegExp(searchCriteria.toLowerCase(),"gi");
    let mgmtData = this.managementInfo.response;
	let count = 0;
    mgmtData.map((data,index) => {
	//console.log(search)
      for (let [key, value] of Object.entries(data)) {
        let deviceObj = {
          hostName: data.hostname,
          platFormId: data.platformId,
          managementIpAddress: data.managementIpAddress,
          reachablityStatus: data.reachabilityStatus,
          upTime: data.upTime,
          lastUpdated: data.lastUpdated,
          reachabilityFailureReason: data.reachabilityFailureReason
        };
       	//console.log(data.hostname)
        if (data.hostname.match(search)&& count == 0){
          console.log("MATCH ",JSON.stringify(deviceObj), null, 2)
	        count = 1;
          //this.managementInfo.devices.push(deviceObj);
	        //console.log("\n\n\n\n\n"+data.hostname,"\n",data.platformId,"\n",data.managementIpAddress,"\n",data.reachabilityStatus,"\n",data.upTime,"\n",data.lastUpdated,"\n",data.reachabilityFailureReason)
        }
      }
	count = 0;
    })
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new apicDevices(method,uri,headers,body)
