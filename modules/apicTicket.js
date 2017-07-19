var rest = require('./api/rest');
module.exports = () => {
  var newRest = rest.httpPOST();
  var newRest2 = rest.httpGET();
  var output = newRest.anotherTestResponse;
  var output2 = newRest2.anotherTestResponse;
  return (
    {
      testResponse: "Cats on everything from Apic Ticket",
      test:output,
      test2:output2
    }
  );
}
