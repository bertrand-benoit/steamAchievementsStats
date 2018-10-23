'use strict';

var config = module.exports = {};

config.IGNORED_ERROR = [];

config.IGNORED_GAME_ID = [
 // no more in Steam shop
  225140, // Duke Nukem 3D: Megaton
],

config.FORCED_STATS = [
  { 'appid' : 363970, 'name' : 'Clicker Heroes', 'allAchievementCount': 111, 'gotAchievementCount': 0}, // cheat detected x_O
  { 'appid' : 227700, 'name' : 'Firefall', 'allAchievementCount': 117, 'gotAchievementCount': 1}, // no more on Steam
  { 'appid' : 233630, 'name' : 'Ascend: Hand of Kul', 'allAchievementCount': 30, 'gotAchievementCount': 3}, // no more on Steam
  { 'appid' : 256410, 'name' : 'Duel of Champions', 'allAchievementCount': 202, 'gotAchievementCount': 37} // no more on Steam
],

config.HIDDEN_GAME = [
  { 'appid' : 363970, 'name' : 'Clicker Heroes'},
  { 'appid' : 227700, 'name' : 'Firefall'},
  { 'appid' : 41070, 'name' : 'Serious Sam BFE'}, // Unreachable Achievements
  { 'appid' : 203990, 'name' : 'Satazius'}, // Broken Achievements
  { 'appid' : 233630, 'name' : 'Ascend: Hand of Kul'},
  { 'appid' : 266250, 'name' : 'Procyon'}, // Unreachable Achievements
  { 'appid' : 57900, 'name' : 'Duke Nukem Forever'}, // DLC not owned
  { 'appid' : 291650, 'name' : 'Pillars of Eternit'}, // Could not be fully completed
];
