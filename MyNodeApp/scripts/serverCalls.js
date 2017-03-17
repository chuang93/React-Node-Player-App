// once I have built the server side endpoints, this is the domain logic that pulls from my server and can be  called by the front end

module.exports.playerLogServerPromise = function playerLogServerPromise(id){
  return new Promise(function(resolve,reject) {
  var request = new XMLHttpRequest();
  request.open('GET', '/playerApp/' +id, true);


  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.response);
      var log= data.gameLogJson;
      resolve(log);
    } else {
     // We reached our target server, but it returned an error
      console.log("reached playerApp/ID but server error");
      reject(Error(request.statusText));
    }
  };
  request.onerror = function() {
    reject(Error("Network Error"));
    // There was a connection error of some sort
    console.log("connection error to server, not reached");
  };

  request.send();
});
}