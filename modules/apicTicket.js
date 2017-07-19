var rest = require('./api/rest');
module.exports = () => {
  var newRest = rest();
  return (
    {testResponse: "Cats on everything from Apic Ticket"}
    newRest.anotherTestResponse
  );
}
