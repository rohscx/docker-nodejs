const apicTicket = require('./modules/apicTicket');

apicTicket.debug()

apicTicket.httpRequest().then((httpReturn)=>{
  console.log(httpReturn);
})



//console.log(test) // REST POST
