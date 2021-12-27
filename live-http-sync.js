#!/usr/bin/env node
var fs = require("fs");
const express = require('express');
require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var wd;
try {
  wd = require('wd');
} catch( err ) {
  wd = require('../../lib/main');
}

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var vm = wd.promiseChainRemote();

// optional extra logging
vm.on('status', function(info) {
  console.log(info.cyan);
});
vm.on('command', function(eventType, command, response) {
  console.log((response || '').grey);
});
  var opts = {
    browserName: process.argv[4] || "MicrosoftEdge",
  };
  
  
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/' + process.argv[3]);
});
app.listen(process.argv[2] || 3000, () => {
vm.init(opts, function(err, sessionid, client){
    if (err) throw err;
    if (client) console.log('… connected to', client.browserName, client.version);
    vm.get("http://localhost:" + process.argv[2], function(err){
      if (err) throw err;

  console.log('server started');
  fs.watch(process.argv[3], function(){
	vm.eval("location.reload()");
})
      // socket io `connection` should fire now
    });
  });
  });

