var restReqeust = require('./modules/apicTicket');
var test = restReqeust.POST(function(err, result) {
  if (err) handle(err);
  console.log(result);
});
  
//console.log(test) // REST POST
