var HTTP = require('HTTP');
module.exports = () => {
  makeRequest(type, url, options) {
    try {
      const result = HTTP.call(type, url, options);
      // console.log(result); // debug
      return result;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      console.log(e) // debug
      return e;
    }
  }
  return (
    {anotherTestResponse: "Cats on everything from API REst"}
  );
}
