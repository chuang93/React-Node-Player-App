// once I have built the server side endpoints, this is the domain logic that pulls from my server and can be  called by the front end
var request = require('request');

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

module.exports.serverGet= function serverGet(serverPath, id = null){
  //server path is initialized already in app.js to the correct path
    var serverRequest = id == null ? serverPath : serverPath +'/' + id ;
    request(serverRequest,function(error,response,body){
      if(error){
        console.log(error);
      }
      else{
        return JSON.parse(body);
      }
    });
}

module.exports.playerServerPromise = function playerServerPromise(name=null){
  return new Promise(function(resolve,reject) {
  var request = new XMLHttpRequest();
  if(name===null){
    request.open('GET', '/playerdashboard/players', true);
  }
  else{
    request.open('GET', '/playerdashboard/players/' + name, true);
  }

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.response);
      resolve(data);
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

module.exports.teamServerPromise = function teamServerPromise(teamId=null){
  return new Promise(function(resolve,reject) {
  var request = new XMLHttpRequest();
  if(teamId===null){
    request.open('GET', '/playerdashboard/teams', true);
  }
  else{
    request.open('GET', '/playerdashboard/teams/' + teamId, true);
  }

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.response);
      resolve(data);
    } else {
     // We reached our target server, but it returned an error
      console.log("reached teams Database but server error");
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