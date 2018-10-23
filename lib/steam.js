'use strict';

const _ = require('lodash');
const async = require('async');
const util = require('util');
const SteamWeb = require('steam-web');
const homeDir = require('os').homedir();
const configFilePath = homeDir + '/.config/steamAchievementsStats/config.js';
const fs = require('fs');

const debug = require('debug')('mySteamClientLib');

const s = new SteamWeb({
  apiKey: process.env.STEAM_API_KEY,
  format: 'json' //optional ['json', 'xml', 'vdf']
});

var config = {};
if (fs.existsSync(configFilePath)) {
    config = require(configFilePath);
    console.log("Successfully loaded configuration file: ", configFilePath);
} else
  debug("No configuration file found: ", configFilePath);

var api = module.exports = {};

api.IGNORED_ERROR = [
  'Requested app has no stats'
];

api.IGNORED_ERROR = _.merge(api.IGNORED_ERROR, config.IGNORED_ERROR);
api.IGNORED_GAME_ID = config.IGNORED_GAME_ID;
api.FORCED_STATS = config.FORCED_STATS;
api.HIDDEN_GAME = config.HIDDEN_GAME;

api.logMessage = function(message, data) {
  console.log(message + (!data ? '' : ': ' + util.inspect(data, false, null, true)));
}

api.getAllGameInfoWithAchievementsStats = function(steamID, done) {
  return api.getOwnedGames(steamID, function(error, allGameInfoResponse) {
    var allGameInfo = allGameInfoResponse.response;
    api.logMessage('Found ' + allGameInfo.game_count + ' owned games. Enhancing information with achievement statistics.');

    var concurrentProcess = process.env.CONCURRENT_PROCESS_LIMIT ? process.env.CONCURRENT_PROCESS_LIMIT : 1000;

    async.eachLimit(allGameInfo.games, concurrentProcess, function(gameInfo, next) {
        // Little optimization => ignore game which has not been played at all.
        if (!gameInfo.playtime_forever) {
          debug('[%s] NEVER played to this game.', gameInfo.name);
          return next();
        }

        if (_.includes(api.IGNORED_GAME_ID, gameInfo.appid)) {
          debug('[%s] ignoring this game because it is no more regarded by Steam computation system.', gameInfo.name);
          return next();
        }

        api.getPlayerAchievements(steamID, gameInfo.appid, function(error, achievementInfo) {
          if (error)
            return next('Error while working on game "' + gameInfo.name + '".: ' + error);

          const stats = achievementInfo.playerstats;

          // Checks if the result is a success.
          if (!stats.success) {
            // Checks if it is an 'ignored error'.
            if (_.includes(api.IGNORED_ERROR, stats.error)) {
              debug('[%s] ignoring result error, because %o is one of the ignored errors.', gameInfo.name, stats.error);
              return next();
            }

            return next('Error while working on game "' + gameInfo.name + '".: ' + stats.error);
          }

          if (!stats.achievements && !_.includes(_.map(api.FORCED_STATS, 'appid'), gameInfo.appid)) {
            debug('[%s] ignoring result because there is no achievement information (%o) => it should have been reported as error from Steam ...', gameInfo.name, stats);
            return next();
          }

          var allAchievementCount = -1;
          var gotAchievementCount = -1;
          if (_.includes(_.map(api.FORCED_STATS, 'appid'), gameInfo.appid)) {
            var forcedStats = _.first(_.filter(api.FORCED_STATS, {appid: gameInfo.appid}));
            allAchievementCount = forcedStats.allAchievementCount;
            gotAchievementCount = forcedStats.gotAchievementCount;
            debug('[%d:%s] forced stats according to configuration => %d achieved on %d achievements.', gameInfo.appid, gameInfo.name, gotAchievementCount, allAchievementCount);
          } else {
            allAchievementCount = stats.achievements.length;
            gotAchievementCount = _.filter(stats.achievements, {achieved : 1}).length;
          }

          const ratings = 100 * gotAchievementCount / allAchievementCount;

          // Ignores game for which there is not at least one success.
          if (!gotAchievementCount && !_.includes(_.map(api.FORCED_STATS, 'appid'), gameInfo.appid)) {
            debug('[%d:%s] ignoring the game because there is no achieved at all, on %d achievements.', gameInfo.appid, gameInfo.name, allAchievementCount);
            return next();
          }

          // Registers achievements information in the general allGameInfo Object.
          gameInfo.achievements = { count : allAchievementCount, achieved: gotAchievementCount, ratings: ratings};

          // TODO: check how to show a pretty percent information.
          debug('[%s:%s] registered %d achieved / %d achievements => ratings %d%%.', gameInfo.appid, gameInfo.name, gotAchievementCount, allAchievementCount, ratings);
          next();
        });
    }, function(error, result) {
      done(error, allGameInfo);
    });
  });
};

api.showAllInterestingStats = function(steamID, done) {
  return api.getPlayerSummaries(steamID, function(error, playerInfo) {
    if (error)
      return done(error);

    // Safe-guard: ensures player has been found.
    if (!playerInfo)
      return done('Unable to find a player with specified Steam ID.');

    api.logMessage('Working on Player "' + playerInfo.personaname + '" (#' + playerInfo.steamid + ').');

    return api.getAllGameInfoWithAchievementsStats(steamID, function(error, allGameInfo) {
        if (error)
          return done(error);

        api.logMessage('Sorting & Performing computation on achievement statistics ...');

        // Works only on game information which now has achievement statistics.
        const fullGameInfo = _.sortBy(_.filter(allGameInfo.games, function(gameInfo) {return gameInfo.achievements;}), 'achievements.ratings');
        var globalCount = 0;
        var globalAchieved = 0;
        var ratingsSum = 0;
        var perfectAchievedGameCount = 0;

        console.log(util.format('Game %%\t\tAchievement Info\t\tGame Name'));
        async.each(fullGameInfo, function(gameInfo, next) {
          ratingsSum += gameInfo.achievements.ratings;
          globalCount += gameInfo.achievements.count;
          globalAchieved += gameInfo.achievements.achieved;

          // Does not show 100% perfect game on standard output.
          if (gameInfo.achievements.achieved == gameInfo.achievements.count)
            perfectAchievedGameCount++;
          else if (!_.includes(_.map(api. HIDDEN_GAME, 'appid'), gameInfo.appid))
            console.log(util.format('%d%%\t\t\t%d/%d\t\t%s', parseInt(gameInfo.achievements.ratings), gameInfo.achievements.achieved, gameInfo.achievements.count, gameInfo.name));

          next();
        }, function(error, result) {
          if (error)
            return done(error);

          if (!result)
            result = '';
          else
            result += '\n';

          result += util.format('Global average information (for %d games, including %d 100% perfect achieved): %d%% (considering %d achievements over %d)', fullGameInfo.length, perfectAchievedGameCount, ratingsSum / fullGameInfo.length, globalAchieved, globalCount);

          api.logMessage('All game info managed.');
          done(null, result);
        });
      });
  });
};

api.allTests = function(steamID, appID, done) {
    return api.getPlayerSummaries(steamID, done);
    // return api.getPlayerAchievements(steamID, appID, done);
};

api.getPlayerSummaries = function(steamID, callback) {
  return s.getPlayerSummaries({
    steamids: steamID,
    callback: function(error, result) {
      if (error)
        return console.error(error);

      if (result)
        result = _.first(result.response.players);
      callback(error, result);
    }
  });
};

api.getOwnedGames = function(steamID, callback) {
  return s.getOwnedGames({
    steamid: steamID,
    include_appinfo: 1,
    include_played_free_games: 1,
    callback: callback
  });
};

api.getPlayerAchievements = function(steamID, appID, callback) {
  return s.getPlayerAchievements({
    gameid: appID,
    steamid: steamID,
    l: 'en',
    callback: callback
  });
};
