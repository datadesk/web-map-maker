# web-map-maker

```
 _     _  _______  _______    __   __  _______  _______    __   __  _______  ___   _  _______  ______   
| | _ | ||       ||  _    |  |  |_|  ||   _   ||       |  |  |_|  ||   _   ||   | | ||       ||    _ |  
| || || ||    ___|| |_|   |  |       ||  |_|  ||    _  |  |       ||  |_|  ||   |_| ||    ___||   | ||  
|       ||   |___ |       |  |       ||       ||   |_| |  |       ||       ||      _||   |___ |   |_||_ 
|       ||    ___||  _   |   |       ||       ||    ___|  |       ||       ||     |_ |    ___||    __  |
|   _   ||   |___ | |_|   |  | ||_|| ||   _   ||   |      | ||_|| ||   _   ||    _  ||   |___ |   |  | |
|__| |__||_______||_______|  |_|   |_||__| |__||___|      |_|   |_||__| |__||___| |_||_______||___|  |_|
```

![screenshot](https://raw.githubusercontent.com/datadesk/web-map-maker/master/mapmaker-screenshot.png)

We make a lot of maps at the Los Angeles Times. So we made this tool to help us make them faster.

This tool is still very much a work in progress — please report any bugs you find using GitHub issues!

## Getting started

You don't need much to get up and running. Download this repo and make a config.js file (we provided a template [here](https://github.com/datadesk/web-map-maker/tree/master/js/config.js-TEMPLATE))

It should look like this:
```
var configOptions = {
    'bingAPI': 'Your API here',
    'attribution': 'Who's making the map here, '
}
```

Then you're ready to run the mapmaker. The easiest way is to fire up a simple python server (obviously you'll need python) with this command:

```
python -m SimpleHTTPSever 8000
```

The app will be hosted at `localhost:8000` by default.

## What you need to know

Because we've developed this as an internal tool for use at the Los Angeles Times, it's really geared toward our use as far as styles and workflow. But it should be customizable and we're open to suggestions that would help make it better for others to use, too.

Chrome is the only supported browser right now.

Also check the [issues tab](https://github.com/datadesk/web-map-maker/issues).

## Make this better

Have any ideas? File an issue, fork this repo or contact jon@latimes.com with thoughts, concerns or questions.

