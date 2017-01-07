
var SteamApi = require('steam-api');

// var statsName = ['global.map.emp_isle'];
// var vanityUrl = "pr00fgames";

// var user = new SteamApi.User();
var userStats = new SteamApi.UserStats(); //);
// var news = new SteamApi.News(
var app = new SteamApi.App();
var player = new SteamApi.Player();
// var inventory = new SteamApi.Inventory();
// var items = new SteamApi.Items();


module.exports = {
  allTests : function(optionalSteamId, appID, done) {
    player.GetBadges(optionalSteamId).done(function(result){
      console.log(result);
    });

    // userStats.GetPlayerAchievements(appId, optionalSteamId).done(function(result){
    //   console.log('Showing result ...');
    //   console.log(result);
    // });


    //
    // // Steam API Backpack
    // items.GetPlayerItems(appId, optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    // // Inventory
    // inventory.GetAppItems(appId, optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    // // User methods
    // user.GetPlayerBans(optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    // user.GetFriendList(optionalRelationship = 'all', optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    // user.GetUserGroupList(optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    // //// e.g. vanityUrl = "pr00fgames";
    // user.ResolveVanityUrl(vanityUrl).done(function(result){
    //   console.log(result);
    // });
    //
    //
    // // UserStats methods
    // //// e.g. appId = 17740;
    // //// e.g. statsName = ['global.map.emp_isle'];
    // userStats.GetGlobalStatsForGame(appId, statsName).done(function(result){
    //   console.log(result);
    // });
    //
    // //// e.g. appId = 620;
    // userStats.GetNumberOfCurrentPlayers(appId).done(function(result){
    //   console.log(result);
    // });
    //
    // userStats.GetSchemaForGame(appId).done(function(result){
    //   console.log(result);
    // });
    //
    // userStats.GetPlayerAchievements(appId, optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    // userStats.GetGlobalAchievementPercentagesForApp(appId).done(function(result){
    //   console.log(result);
    // });
    //
    // userStats.GetUserStatsForGame(appId, optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    //
    // // News Methods
    // news.GetNewsForApp(
    //                     appId,
    //                     optionalCount = 5,
    //                     optionalMaxLength = null
    //                   )
    //     .done(function(result){
    //   console.log(result);
    // });
    //
    //
    // // App Methods
    // app.appDetails(appId).done(function(result){
    //   console.log(result);
    // });
    //
    // app.GetAppList().done(function(result){
    //   console.log(result);
    // });
    //
    // // app.GetServersAtAddress(addressOrIp).done(function(result){
    // //   console.log(result);
    // // });
    //
    // // app.UpToDateCheck(appId, version).done(function(result){
    // //   console.log(result);
    // // });
    //
    //
    // // Player Methods
    // player.GetSteamLevel(optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    // player.GetPlayerLevelDetails(optionalSteamId).done(function(result){
    //   console.log(result);
    // });
    //
    //
    //
    // // player.GetCommunityBadgeProgress(optionalBadgeId, optionalSteamId).done(function(result){
    // //   console.log(result);
    // // });
    //
    player.GetOwnedGames(
                          optionalSteamId,
                          optionalIncludeAppInfo = true,
                          optionalIncludePlayedFreeGames = false,
                          optionalAppIdsFilter = []
                        )
          .done(function(result){
      console.log(result);
    });

    done();
  }

};
