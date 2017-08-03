const rest = require('./api/rest');
const securityFile = require('../securityFile')


const method = 'GET';
const uri = "";
const headers = "";
const body = "";

class prtgDevices extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
    this.deviceId = "";
    this.managementInfo = {
      devicesObj:{},
      searchResult:[],
    };
  }

  setHeaders(ticket){
    this.headers = {
        "content-type": "application/json",
        "x-auth-token": ticket,
      };
  }

  setDeviceId(deviceId){
    this.deviceId = "/"+deviceId;
  }

  setManagementInfo (devicesObj){
    this.managementInfo.devicesObj = devicesObj;
  }

  setUri(uriBase,uCreds){
    let newUri = uriBase+"/api/table.json?content=sensors&output=json&columns=objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite"+uCreds;
    this.uri = newUri;
  }

  getGraph(uriBase,uCreds){
    let newUri = uriBase+"/api/table.json?content=sensors&output=json&columns=objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite"+uCreds;
    let newResult = this.managementInfo.searchResult.map((data)=>{
      data.graph = newUri;
    })
    console.log(newResult);
  }

  getManagementInfo (searchCriteria){
    let search = new RegExp(searchCriteria.toLowerCase(),"gi");
    let mgmtData = this.managementInfo.devicesObj.sensors;
    let count = 0;
    mgmtData.map((data,index) => {
  //console.log(search)
      for (let [key, value] of Object.entries(data)) {
        let statusObj = {
          group: data.group,
          device: data.device,
          sensor: data.sensor,
          objId: data.objid,
          status: data.status,
          lastValue: data.lastvalue
        };
        //console.log(data.hostname)
        if (data.device.match(search)&& count == 0){
          //console.log("MATCH ",statusObj)
          count = 1;
          this.managementInfo.searchResult.push(statusObj);
          //console.log("\n\n\n\n\n"+data.hostname,"\n",data.platformId,"\n",data.managementIpAddress,"\n",data.reachabilityStatus,"\n",data.upTime,"\n",data.lastUpdated,"\n",data.reachabilityFailureReason)
        }
      }
  count = 0;
    })
  }

  getSearchResult (){
    return this.managementInfo.searchResult;
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new prtgDevices(method,uri,headers,body)
