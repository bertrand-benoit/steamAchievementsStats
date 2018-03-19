#!/usr/bin/env node
// Author: Bertrand BENOIT <contact@bertrand-benoit.net>
// Version: 2.1
// Description: computes achievement statistics and shows them order by interesting information.
'use strict';

const util = require('util');
const steamLib = require(__dirname + '/lib/steam.js');

// N.B.: can't use 'cli' node module because it 'converts' Steam ID because they are too long ....
//const cli = require('cli');
// Parses the CLI directly.
if (process.argv.length < 3) {
  console.error('Usage: ', process.argv[1], ' <steam ID>');
  process.exit(1);
}
var steamID = process.argv[2];

steamLib.showAllInterestingStats(steamID, function(error, result) {
  if (error)
    return console.error(error);

  console.log(util.inspect(result, false, null, true));
});
