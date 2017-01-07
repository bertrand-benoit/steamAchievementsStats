#!/usr/bin/env node

const util = require('util');

// const testWithSteamApi = require(__dirname + '/lib/testWithSteamApi.js');
const testWithSteamWeb = require(__dirname + '/lib/testWithSteamWeb.js');

var mySteamID = '76561198046029799';
var appId = 377160; // Fallout 4

// testWithSteamApi.allTests(mySteamID, appId, function() {
//   console.log('OK');
// });

testWithSteamWeb.showAllInterestingStats(mySteamID, function(error, result) {
  if (error)
    return console.error(error);

  console.log(util.inspect(result, false, null, true));
});
