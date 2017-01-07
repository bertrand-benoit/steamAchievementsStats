#!/usr/bin/env node

const util = require('util');
const testWithSteamWeb = require(__dirname + '/lib/steam.js');

var mySteamID = '76561198046029799';

testWithSteamWeb.showAllInterestingStats(mySteamID, function(error, result) {
  if (error)
    return console.error(error);

  console.log(util.inspect(result, false, null, true));
});
