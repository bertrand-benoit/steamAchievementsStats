#!/usr/bin/env node

// Version 2.0.

const util = require('util');
const myOwnSteamLib = require(__dirname + '/lib/steam.js');

var mySteamID = '76561198046029799';

myOwnSteamLib.showAllInterestingStats(mySteamID, function(error, result) {
  if (error)
    return console.error(error);

  console.log(util.inspect(result, false, null, true));
});


//http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C281B1657755D9A5DD02D84608BCB6AB&steamid=76561198046029799&format=json&include_appinfo=1&include_played_free_games=1
