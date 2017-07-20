const requestApicTicket = require('./modules/apicTicket');


requestApicTicket.POST(method,uri,body).then((httpReturn)=>{
  console.log(httpReturn);
})


//console.log(test) // REST POST
