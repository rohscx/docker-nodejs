var restReqeust = require('./modules/apicTicket');

restReqeust.POST().then(function(harp){
  console.log("THIS STUFF SUCKS",harp);
})

//console.log(test) // REST POST

