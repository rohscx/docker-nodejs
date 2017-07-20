const requestApicTicket = require('./modules/apicTicket');


requestApicTicket.POST().then((httpReturn)=>{
  console.log(httpReturn);
})


//console.log(test) // REST POST
