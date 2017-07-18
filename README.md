```
 _     _  _______  _______    __   __  _______  _______    __   __  _______  ___   _  _______  ______   
| | _ | ||       ||  _    |  |  |_|  ||   _   ||       |  |  |_|  ||   _   ||   | | ||       ||    _ |  
| || || ||    ___|| |_|   |  |       ||  |_|  ||    _  |  |       ||  |_|  ||   |_| ||    ___||   | ||  
|       ||   |___ |       |  |       ||       ||   |_| |  |       ||       ||      _||   |___ |   |_||_ 
|       ||    ___||  _   |   |       ||       ||    ___|  |       ||       ||     |_ |    ___||    __  |
|   _   ||   |___ | |_|   |  | ||_|| ||   _   ||   |      | ||_|| ||   _   ||    _  ||   |___ |   |  | |
|__| |__||_______||_______|  |_|   |_||__| |__||___|      |_|   |_||__| |__||___| |_||_______||___|  |_|
```

![Web map maker screenshot](https://user-images.githubusercontent.com/695934/28221465-33ce3702-6878-11e7-9cc6-978ff58de211.png)


We make a lot of maps at the Los Angeles Times. So we made this tool to help us make them faster. It uses [Mapzen's Tangram mapping engine](https://mapzen.com/products/tangram/) to render OpenStreetMap data as vector tiles. It then bakes out your map into a static image or an SVG.

This tool is still very much a work in progress, so please [give us feedback](https://github.com/datadesk/web-map-maker/issues) if you find something amiss. 

## Getting started

You don't need much to get up and running. Download this repo and make a config.js file (we provided a template [here](https://github.com/datadesk/web-map-maker/tree/master/js/config.js-TEMPLATE)), then put it in the "js" directory. You'll also need to create a config.yaml file and leave it in the main directory.

A Bing API key isn't necessary to use the map maker; only for geocoding and location search. You can also define initial coordinates or zoom so you can start the map in your preferred location each time. 

The gutter and columnWidth are the pixel equivelants for the Times' print 6-column layout.

You also need a [Mapzen key](https://mapzen.com/developers/sign_in). That key needs to be placed both in the config.js file and the config.yaml file.

Your config.js file should look like this:
```js
var configOptions = {
    'bingAPI': 'Your API here',
    'attribution': 'Your name, ',
    'initCoords': [34.0425, -118.24],
    'initZoom': 14,
    'mapzen-api': 'mapzen-uxhmqQc',
    'columnWidth': 110.45,
    'gutterWidth': 12
}
```

Your config.yaml file should look like this:
```yaml
global:
    # Sign up for a Mapzen API key to enjoy higher rate limits
    # https://mapzen.com/documentation/overview/#developer-accounts-and-api-keys
    sdk_mapzen_api_key: 'mapzen-KEYHERE'
```

Then you're ready to run the mapmaker. The easiest way is to fire up a simple python server (obviously you'll need python) with this command:

```sh
python -m SimpleHTTPServer 8000
```

The app will be hosted at `localhost:8000` by default.

## What you need to know

Because we've developed this as an internal tool for use at the Los Angeles Times, it's  geared toward our use as far as styles and workflow. But it should be customizable and we're open to suggestions that would help make it better for others to use, too.

Chrome and Firefox are supported.

## Vector files for print
Because we make maps for web and print, if you select a column size from the drop-down you'll get a map with the column-equivelant for our six-column layout. The vector paths exported from "download vector" can then be converted to CMYK.

## Make this better

Have any ideas? File an issue, fork this repo or contact jon@latimes.com with thoughts, concerns or questions.

