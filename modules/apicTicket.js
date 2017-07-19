var rest = require('./api/rest');
module.exports = () => {
  var newRest = rest();
  var output = newRest.anotherTestResponse;
  console.log("test");
  return (
    {testResponse: "Cats on everything from Apic Ticket"}
  );
}
