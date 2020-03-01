:warning: This project is now hosted on [Gitlab](https://gitlab.com/bertrand-benoit/steamAchievementsStats); switch to it to get newer versions.

# Tiny Steam Achievements Statistics client
This simple script allows to retrieve all achievements statistics information of Steam Player whose ID is specified on command line.


## Environment
You must define the *STEAM_API_KEY* environment variable, with the Steam API Key you want to use.

See http://steamcommunity.com/dev.


Optionally, you can define define *CONCURRENT_PROCESS_LIMIT* environment variable, to limit count of process running simultaneously. For instance, it is very useful if you launch the script on a system with less/few resources, like a NAS !


## Installation
You only have to launch this instruction the first time.
```
npm install
```

## Configuration file
You can optionaly create the configuration file
```
~/.config/steamAchievementsStats/config.js
```

See **misc/config.sample.js** as sample.


## Usage
Launch this script, with your Steam ID.

For instance:
```
./steamAchievementsStats.js 76561198046029799
```

You can use the DEBUG node environment variable to get plenty of useful information.
For instance:
```
DEBUG=* ./steamAchievementsStats.js 76561198046029799
```

## Contributing
Don't hesitate to [contribute](https://opensource.guide/how-to-contribute/) or to contact me if you want to improve the project.

You can [report issues or request features](https://gitlab.com/bertrand-benoit/steamAchievementsStats/issues) and propose [merge requests](https://gitlab.com/bertrand-benoit/steamAchievementsStats/merge_requests).

## Versioning
The versioning scheme we use is [SemVer](http://semver.org/).

## Authors
[Bertrand BENOIT](mailto:contact@bertrand-benoit.net)

## License
This project is under the GPLv3 License - see the [LICENSE](LICENSE) file for details.
