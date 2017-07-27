const rest = require('./api/rest');
const parseString = require('xml2js').parseString;

const method = 'GET';
const uri = "";
const headers = "";
const body = "";

class iseNetDevices extends rest {
  constructor (method,uri,headers,body){
    super(method,uri,headers,body)
    this.deviceList = "";
    this.deviceJsonArray = [];
    this.returnMetadata = "";
  }

  setHeaders(headers){
    this.headers = headers;
  }

  setReturnPage(pageNumber){
    this.uri = "&page="+pageNumber;
  }

  setUriBase (uriBase){
    this.uriBase = uriBase;
  }

  setDeviceList(data) {
    this.deviceList = data;
  }

  getDeviceJsonArray() {
    return this.deviceJsonArray;
  }

  getReturnMetadata() {
    return this.returnMetadata
  }

  getDeviceListXml() {
    return this.deviceList;
  }

  getDeviceListJson() {
    return new Promise((resolve, reject) =>{
      let data = this.deviceList;
      parseString(data, (err,result) =>{
         if (result){
           let metaData = [result['ns3:searchResult']['$'],result['ns3:searchResult'].nextPage[0]['$']]
           this.returnMetadata = metaData;
           result['ns3:searchResult'][0].resource.map((data) => {
             console.log(data['$'].name)
             //deviceInfo = {name: data['$'].name, data['$'].id};
             //this.deviceJsonArray.push(deviceInfo);

           })
           resolve(result['ns3:searchResult']);
         } else {
           reject(err);
         }
      })
    })
  }

  setUri(){
    this.uri = this.uriBase+":9060/ers/config/networkdevice?size=100";
  }

  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("method: "+this.method,'\n',"uri: "+this.uri,'\n',"headers: "+JSON.stringify(this.headers),'\n',"body: "+JSON.stringify(this.body))
  }
}

module.exports = new iseNetDevices(method,uri,headers,body)
