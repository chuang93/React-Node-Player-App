//test if ajax call to my rest service will load the json into the player log ID in playerAPp.pug
var request = new XMLHttpRequest();
request.open('GET', '/playerApp/203083', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = request.responseText;
    //console.log(data);
    var playerlog=document.getElementById('playerLog');
  	playerlog.innerHTML=data;
  } else {
    // We reached our target server, but it returned an error
    console.log("reached playerApp/ID but server error");
  }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log("connection error to server, not reached");
};

request.send();